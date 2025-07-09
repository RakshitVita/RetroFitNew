import { create } from 'zustand';
import { axiosInstance } from '../AxiosInstance/axios_instance';
import Cookies from "js-cookie";
import toast from 'react-hot-toast';

function getEmailFromCookie() {
  try {
    const userCookie = Cookies.get("user");
    if (!userCookie) return null;
    const user = JSON.parse(userCookie);
    return user.email || null;
  } catch {
    return null;
  }
}
const useUserStore = create((set,get) => ({

  isPremium: false,
  languages: ["python", "javaScript"],
  allowedLanguages: ["python"],
  extensions: {
    "python": [".py", ".txt"],
    "javascript": [".js"]
  },
  isLoading: true,
  isDownloading: false,
  isLoaSubscriction: false,
  error: null,
  lineLimitError: '',
  conRedMessage: '',
  UserStatusLoading: false,
  ValidAPiPayload: {},


  downloads: [], // <--- Make sure this is an array, not undefined
  downloadsLoading: false,

  setIsLoading: (value) => set({ isLoading: value }),
  setLineLimitError: (msg) => set({ lineLimitError: msg }),
  setConRedMessage: (msg) => set({ conRedMessage: msg }),

  fetchUserStatus: async () => {
    set({
      UserStatusLoading: true,
      error: null,
      languages: [],
      allowedLanguages: [],
      extensions: {},

    });
    const token = Cookies.get("access_token");
    const email = getEmailFromCookie();
    try {
      const response = await axiosInstance.post('/status',
        { email },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      ); // replace with your endpoint
      const isPremium = response.data?.isPremium || false;
      set({
        isPremium,
        credits: response.data?.credits ?? 0,
        languages: response.data?.languages || [],
        allowedLanguages: response.data?.allowed_languages || [],
        extensions: response.data?.extensions || {},
        UserStatusLoading: false,
      });
    } catch (err) {
      console.error('Failed to fetch user status:', err);
      set({
        error: 'Failed to fetch user status',
        isPremium: false,
        credits: 0,
        languages: [],
        allowedLanguages: [],
        extensions: {},
        credit_remaining: {},
        credit_usage: {},
        isLoading: false,
      });
    }
  },

  validationCheck: async (file, language) => {
    set({ isLoading: true });
    //getting token from cookies
    const token = Cookies.get("access_token");
    const formData = new FormData();
    const email = getEmailFromCookie();

    formData.append('file', file);
    formData.append('language', language);
    formData.append('email', email || ''); // Ensure email is always sent
    try {
      const response = await axiosInstance.post(
        '/check_limit', formData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      set({
        ValidAPiPayload: response.data,isLoading: false,
      })
      return response.data;
    } catch (error) {
      console.error('Conversion failed:', error);
      set({ isLoading: false});
      return null;
    }
  },


  convertFile: async (file, language) => {
    set({error: null });
    //getting token from cookies
    const token = Cookies.get("access_token");
    const formData = new FormData();
    const email = getEmailFromCookie();

    formData.append('file', file);
    formData.append('language', language);
    formData.append('email', email || '');

    // const updatedPayload = {
    //   ...ValidAPiPayload,        // original API response
    //   email: email || '',
    //   language: language || '',
    // };

    // If you have an object (e.g., ValidAPiPayload), append its fields:
    // Object.entries(get().ValidAPiPayload).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });
    try {
      const response = await axiosInstance.post(
        '/convert-file', formData,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );


      set({ conRedMessage: response.data.message });
      return response.data;
    } catch (error) {
      console.error('Conversion failed:', error);
      set({ error: 'File conversion failed'});
    }
  },

  fetchDownloads: async () => {
    set({ downloadsLoading: true });
    try {
      const token = Cookies.get("access_token");
      const email = getEmailFromCookie();
      const response = await axiosInstance.post(
        "/get_all_files",
        { email }, // <-- send email in body
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      set({ downloads: response.data, downloadsLoading: false });
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch downloads:", error);
      set({ downloads: [], downloadsLoading: false });
    }
  },

  getAndDownloadFile: async (filename, fileId) => {
    set({ isDownloading: true });
    try {
      const token = Cookies.get("access_token");
      const email = getEmailFromCookie();
      const response = await axiosInstance.post(
        "/download",
        { filename, email, fileId }, // email in body
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "Content-Type": "application/json"
          },
          responseType: "blob",
        }
      );
      // Always use the filename from backend if present
      const disposition = response.headers['content-disposition'];
      let downloadName = "downloaded_file";
      if (disposition && disposition.includes('filename=')) {
        downloadName = disposition
          .split('filename=')[1]
          .replace(/['"]/g, '')
          .trim();
      }
      if (!downloadName) {
        // fallback if header is missing
        downloadName = "downloaded_file.pdf";
      }
      const contentType = response.headers['content-type'] || 'application/octet-stream';
      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = downloadName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      set({ isDownloading: false });
      toast.success("File downloaded successfully");

    } catch (error) {
      console.error("Download failed:", error);
      set({ isDownloading: false });
      toast.error("File Downloading failed. Please try again.");
    }
  },

  usageDetail: async () => {
    set({ isLoaSubscriction: true })
    const token = Cookies.get("access_token");
    const email = getEmailFromCookie();
    try {
      const response = await axiosInstance.post('/get_user_info',
        { email }, // email in body
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          }
        }
      );
      set({ Languages: response.data, isLoaSubscriction: false })
      console.log(response.data);
    } catch (error) {
      set({ Languages: [''], isLoaSubscriction: false })
      console.error("Failed to Load", error);
      toast.error("Faild to Load Data");
    }
  },

  resetUserState: () => set({
    isPremium: false,
    languages: ["python", "javascript"],
    allowedLanguages: ["python"],
    extensions: {
      "python": [".py", ".txt"],
      "JavaScript": [".js"]
    },
    isLoading: true,
    isDownloading: false,
    error: null,
    lineLimitError: '',
    conRedMessage: '',
    UserStatusLoading: false,
    downloads: [],
    downloadsLoading: false,
  }),

}));

export default useUserStore;