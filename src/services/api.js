import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { bearerMiddleware } from "../middleware";
import swAlert from "../components/pages/swAlert";

const onQueryStartedErrorToast = async (args, { queryFulfilled }) => {
  try {
    await queryFulfilled;
  } catch (error) {
    if (error?.error?.data?.message == "Unauthenticated.") {
      localStorage.removeItem("clt_token");
      window.location.href = "/signin";
    } else if (error?.error?.status == 426) {
      sessionStorage.setItem("426Err", error?.error?.data?.message);
      window.location.href = "/signin";
    } else if (error?.error?.status == 500) {
      swAlert();
    } else if (error?.error?.status == 429) {
      localStorage.removeItem("clt_token");
      window.location.href = "/signin";
    }

  }
};

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://skycontroller.connetz.shop/tl-api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("clt_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Accept", "application/json");
      }
      return headers;
    },
  }),
  tagTypes: [
    "getUserinfo",
    "d_enquiries",
    "getStaffs",
    "projects",
    "projectComments",
    "members",
    "files",
    "viewProject",
    "profile",
    "company",
    "smtp",
    "profileDetails",
    "ipaddress",
  ],
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => "/get-user-info",
      providesTags: ["getUserinfo"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        body: {},
      }),

      middleware: bearerMiddleware,
    }),
    uploadEnquiries: builder.mutation({
      query: (data) => ({
        url: "/enquiries/upload-csv",
        method: "POST",
        body: data,
        formData: true,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
      invalidatesTags: ["d_enquiries"],
    }),
    addEnquiry: builder.mutation({
      query: ({ data }) => ({
        url: "/enquiries/add-enq",
        method: "POST",
        body: data,
        formData: true,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
      invalidatesTags: ["d_enquiries"],
    }),
    getDraftEnq: builder.query({
      query: () => "/enquiries/get-draft-enqs",
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      providesTags: ["d_enquiries"],
    }),
    GetDropDownData: builder.query({
      query: () => "/enquiries/get-draft-enqs",
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      providesTags: ["d_enquiries"],
    }),
    GetAssignedEnquiries: builder.query({
      query: () => "/enquiries/get-draft-enqs",
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      providesTags: ["d_enquiries"],
    }),
    approveDraftEnq: builder.mutation({
      query: ({ data }) => ({
        url: "/enquiries/approve-draft-enq",
        method: "POST",
        body: data,
        formData: true,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
      invalidatesTags: ["d_enquiries"],
    }),
    draftEnqPagination: builder.query({
      query: ({ no }) => ({
        url: `/enquiries/get-draft-enqs?page=${no}`,
      }),

      onQueryStarted: onQueryStartedErrorToast,
    }),
    draftEnqSearch: builder.mutation({
      query: (data) => ({
        url: `/enquiries/search-draft-enq`,
        method: "POST",
        body: data,
        formData: true,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    draftEnqView: builder.query({
      query: ({ id }) => `/enquiries/get-draft-enq?id=${id}`,
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    historyByDate: builder.query({
      query: ({ date }) => `/history-by-date?date=${date}`,
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    getNewEnq: builder.query({
      query: () => "/enquiries/new-enqs",
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      providesTags: ["new_enq"],
    }),
    newEnqPagination: builder.query({
      query: ({ no }) => ({
        url: `/enquiries/new-enqs?page=${no}`,
      }),

      onQueryStarted: onQueryStartedErrorToast,
    }),
    newEnqSearch: builder.mutation({
      query: (data) => ({
        url: `/enquiries/search-enqs`,
        method: "POST",
        body: data,
        formData: true,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    assignEnquiry: builder.mutation({
      query: (data) => ({
        url: `/enquiries/assign-enqs`,
        method: "POST",
        body: data,
        formData: true,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["new_enq"],
      middleware: bearerMiddleware,
    }),
    requestEnqs: builder.query({
      query: () => ({
        url: `/enquiries/request-enqs`,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    viewInvoice: builder.query({
      query: (args) => ({
        url: `/invoices/view?id=${args}`,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    getAllInvoices: builder.query({
      query: (args) => ({
        url: `/invoices/get-by-status?status=${args?.split(" ").join("_")}`,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    searchInvoice: builder.mutation({
      query: (data) => ({
        url: "/invoices/search",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    invoicesPagination: builder.query({
      query: (arg) => ({
        url: `/invoices/get-by-status?status=${arg.type
          ?.split(" ")
          .join("_")}&page=${arg.no}`,
      }),
      onQueryStarted: onQueryStartedErrorToast,
    }),
    zipInvoice: builder.query({
      query: (data) => ({
        url: `/invoices/zip-invoice?invoice_ids=[${data?.invoice_ids}]`,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    getAllProposals: builder.query({
      query: (args) => ({
        url: `/proposals/get-by-status?status=${args?.split(" ").join("_")}`,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
      onQueryStarted: onQueryStartedErrorToast,
    }),
    searchProposal: builder.mutation({
      query: (data) => ({
        url: "/proposals/search",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
      onQueryStarted: onQueryStartedErrorToast,
    }),
    proposalsPagination: builder.query({
      query: (arg) => ({
        url: `/proposals/get-by-status?status=${arg.type
          ?.split(" ")
          .join("_")}&page=${arg.no}`,
      }),
      onQueryStarted: onQueryStartedErrorToast,
    }),
    viewProposal: builder.query({
      query: (args) => ({
        url: `/proposals/view?id=${args}`,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getStaffs: builder.query({
      query: (args) => ({
        url: `/staffs/get-by-type?type=${args}`,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      providesTags: ["getStaffs"],
      middleware: bearerMiddleware,
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getAllStaffs: builder.query({
      query: () => ({
        url: `/staffs/get-by-type`,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      providesTags: ["getStaffs"],
      middleware: bearerMiddleware,
      onQueryStarted: onQueryStartedErrorToast,
    }),

    viewStaff: builder.query({
      query: (args) => ({
        url: `/staffs/view?staff_id=${args}`,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
      onQueryStarted: onQueryStartedErrorToast,
    }),
    staffStatus: builder.mutation({
      query: (data) => ({
        url: "/staffs/change-status",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
      onQueryStarted: onQueryStartedErrorToast,
      invalidatesTags: ["getStaffs"],
    }),
    staffTransferDetails: builder.mutation({
      query: (data) => ({
        url: "/staffs/get-transfer-enqs-details",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
      onQueryStarted: onQueryStartedErrorToast,
    }),
    staffTransferEnquiries: builder.mutation({
      query: (data) => ({
        url: "/staffs/transfer-enquiries",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getJSONDecodedLogs: builder.mutation({
      query: (data) => ({
        url: "/get-json-file-data",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
      onQueryStarted: onQueryStartedErrorToast,
    }),
    unlockScreen: builder.mutation({
      query: (data) => ({
        url: "/unlock",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    lockScreen: builder.mutation({
      query: (data) => ({
        url: "/lockout",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),

    projectsList: builder.query({
      query: (type) => ({
        url: `/projects/get-list?type=${type}`,
      }),
      providesTags: ["projects"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    projectsPagination: builder.query({
      query: ({ no }) => ({
        url: `/projects/get-list?page=${no}`,
      }),

      onQueryStarted: onQueryStartedErrorToast,
    }),
    viewProject: builder.query({
      query: (id) => ({
        url: `/projects/view?id=${id}`,
      }),
      providesTags: ["viewProject"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    addComment: builder.mutation({
      query: (data) => ({
        url: "/projects/add-comment",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["projectComments", "viewProject"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    addReply: builder.mutation({
      query: (data) => ({
        url: "/projects/add-reply",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["projectComments", "viewProject"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    getComments: builder.query({
      query: (id) => ({
        url: `/projects/get-comments?project_id=${id}`,
      }),
      providesTags: ["projectComments"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    uploadAttachment: builder.mutation({
      query: (data) => ({
        url: "/projects/upload-attachment",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["files", "viewProject"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    assignMember: builder.mutation({
      query: (data) => ({
        url: "/projects/assign-member",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["members"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    downloadAttachment: builder.query({
      query: (id) => ({
        url: `/projects/download-attachment?id=${id}`,
      }),
      providesTags: ["projectComments", "viewProject"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getInvoicesAccessKeys: builder.query({
      query: (args) => ({
        url: `/otp/invoice-access-keys?type=${args?.type}`,
      }),
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getInvoicesAccessKeysPagination: builder.query({
      query: (args) => ({
        url: `/otp/invoice-access-keys?type=${args?.type}&page=${args?.no}`,
      }),
      onQueryStarted: onQueryStartedErrorToast,
    }),
    profileUpdate: builder.mutation({
      query: (data) => ({
        url: "/update-profile-details",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["getUserinfo", "profileDetails"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    companyDetailsUpdate: builder.mutation({
      query: (data) => ({
        url: "/update-company-details",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["getUserinfo", "profileDetails"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    bankDetailsUpdate: builder.mutation({
      query: (data) => ({
        url: "/update-bank-details",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["getUserinfo", "profileDetails"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    userAgreementUpdate: builder.mutation({
      query: (data) => ({
        url: "/accept-agreement",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["getUserinfo"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    sentAgreement: builder.mutation({
      query: (data) => ({
        url: "/agreement-sent",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["getUserinfo"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    downloadAgreement: builder.query({
      query: () => ({
        url: `/download-agreement`,
      }),
      // providesTags: ["getUserInfo"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    profileSettings: builder.query({
      query: () => ({
        url: `/settings/profile`,
      }),
      providesTags: ["profile"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    verifyOPT: builder.mutation({
      query: (data) => ({
        url: "/settings/profile/verify-otp",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["profile"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    verifyCompanyOPT: builder.mutation({
      query: (data) => ({
        url: "/settings/company/verify-otp",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["company", "profile"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    verifyProfileOPT: builder.mutation({
      query: (data) => ({
        url: "/settings/profile/verify-otp",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["company", "profile"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    sendOPT: builder.mutation({
      query: (data) => ({
        url: "/settings/profile/send-otp",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["profile"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    sendCompanyOPT: builder.mutation({
      query: (data) => ({
        url: "/settings/company/send-otp",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["profile", "company"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    companySettings: builder.query({
      query: () => ({
        url: `/settings/company`,
      }),
      providesTags: ["company"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    branchesList: builder.query({
      query: () => ({
        url: `/settings/branches/list`,
      }),
      providesTags: ["branch"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    createBranch: builder.mutation({
      query: (data) => ({
        url: "/settings/branches/create",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["branch"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    viewBranch: builder.query({
      query: (id) => ({
        url: `/settings/branches/view?id=${id}`,
      }),
      providesTags: ["viewBranch"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    updateBranch: builder.mutation({
      query: (data) => ({
        url: "/settings/branches/update",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["branch"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    deleteBranch: builder.mutation({
      query: (data) => ({
        url: "/settings/branches/delete",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["branch"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    manageIps: builder.query({
      query: (id) => ({
        url: `/settings/branches/manage-ip?id=${id}`,
      }),
      providesTags: ["branchIps"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    addIp: builder.mutation({
      query: (data) => ({
        url: "/settings/branches/add-ip",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["branchIps"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    deleteIp: builder.mutation({
      query: (data) => ({
        url: "/settings/branches/delete-ip",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["branchIps"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    bankSettings: builder.query({
      query: () => ({
        url: `/settings/bank-account`,
      }),
      providesTags: ["bank"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    verifyBank: builder.mutation({
      query: (data) => ({
        url: "/settings/bank-account/verify",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["bank"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),

    createStaff: builder.mutation({
      query: (data) => ({
        url: "/staffs/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bank"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),

    deleteStaff: builder.mutation({
      query: (data) => ({
        url: "/staffs/delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bank"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    deleteAcademics: builder.mutation({
      query: (data) => ({
        url: "/remove-academic",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bank"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    terminateStaff: builder.mutation({
      query: (data) => ({
        url: "/staffs/terminate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bank"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    updateStaff: builder.mutation({
      query: (data) => ({
        url: "/staffs/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bank"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),

    updateStaffIpAuth: builder.mutation({
      query: (data) => ({
        url: "/staffs/update_ip_auth",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bank"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    updateStaffStatus: builder.mutation({
      query: (data) => ({
        url: "/staffs/update_status ",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bank"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),

    inactivateStaff: builder.mutation({
      query: (data) => ({
        url: "/staffs/inactivate-staff",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bank"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    getSmtpSettings: builder.query({
      query: () => ({
        url: `/settings/smtp`,
      }),
      providesTags: ["smtp"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    updateSmtp: builder.mutation({
      query: (data) => ({
        url: "/settings/update-smtp",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["smtp"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    getProfileDetails: builder.query({
      query: () => ({
        url: `/get-profile-details`,
      }),
      providesTags: ["profileDetails"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    getExtensions: builder.query({
      query: ({ active }) => ({
        url: `/extensions/get-by-type?page_type=${active}`,
      }),
      middleware: bearerMiddleware,
    }),
    extensionView: builder.query({
      query: ({ id }) => `/extensions/view?ext_id=${id}`,
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),

    StaffsView: builder.query({
      query: ({ id }) => `/staffs/view?staff_id=${id}`,
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    staffList: builder.query({
      query: ({ type }) => `/staffs/list?page_type=${type}`,
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),

    terminatedStaff: builder.query({
      query: () => `/staffs/list?page_type=terminated`,
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    InactiveStaff: builder.query({
      query: () => `/staffs/list?page_type=inactive`,
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    getBranchesAndExtensions: builder.query({
      query: () => `/staffs/get-exten-and-branches`,
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),

    addShift: builder.mutation({
      query: (data) => ({
        url: "/settings/branches/create-shift",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ipaddress"],
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
    }),
    createIp: builder.mutation({
      query: (data) => ({
        url: "/settings/put-ip",
        method: "POST",
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      invalidatesTags: ["ipaddress"],
    }),
    getIpAddresses: builder.query({
      query: () => `/settings/ipaddressget`,
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      providesTags: ["ipaddress"],
    }),
    // top search
    getTopsearches: builder.query({
      query: ({ search }) => `/settings/${search}`,
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      providesTags: ["ipaddress"],
    }),
    enquiryView: builder.query({
      query: ({ id }) => `/settings/${id}`,
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      providesTags: ["ipaddress"],
    }),

    // staff list
    getStaffList: builder.query({
      query: () => `/settings/all-staffs`,
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      providesTags: ["ipaddress"],
    }),
    getStaffDetails: builder.query({
      query: ({ id }) => `/settings/staff-pull?staff_id=${id}`,
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      providesTags: ["ipaddress"],
    }),

    updateStaffIp: builder.mutation({
      query: (data) => ({
        url: "/settings/update-ip",
        method: "POST",
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      invalidatesTags: ["ipaddress"],
    }),

    updateStaffShift: builder.mutation({
      query: (data) => ({
        url: "/settings/update-shift",
        method: "POST",
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      invalidatesTags: ["ipaddress"],
    }),

    updateIpAuth: builder.mutation({
      query: (data) => ({
        url: "/settings/update-ip-auth",
        method: "POST",
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      invalidatesTags: ["ipaddress"],
    }),

    deleteIpAddress: builder.mutation({
      query: (data) => ({
        url: "/settings/delete-ip",
        method: "POST",
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      invalidatesTags: ["ipaddress"],
    }),
    deleteShift: builder.mutation({
      query: (data) => ({
        url: "/settings/branches/delete-shift",
        method: "POST",
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      invalidatesTags: ["ipaddress"],
    }),

    verifyCompanyDetailsOTP: builder.mutation({
      query: (data) => ({
        url: "/settings/company/verify-otp",
        method: "POST",
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      invalidatesTags: ["ipaddress"],
    }),
    verifyBankDetailsOTP: builder.mutation({
      query: (data) => ({
        url: "/settings/bank-account/verify",
        method: "POST",
        body: data,
      }),
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      invalidatesTags: ["ipaddress"],
    }),
    getDashboardfDetails: builder.query({
      query: () => `/dashboards-all`,
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      providesTags: ["ipaddress"],
    }),
    getDashboardfDetails2: builder.query({
      query: () => `/call-durations`,
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      providesTags: ["ipaddress"],
    }),
    getAllCallDetails: builder.query({
      query: ({ type, page }) => `/all-calls?direction=${type}&page=${page}`,
      onQueryStarted: onQueryStartedErrorToast,
      middleware: bearerMiddleware,
      providesTags: ["ipaddress"],
    }),

    // Dashboard

    getGeneralInfo: builder.query({
      query: () => `/dashboards/get-general-info`,
      onQueryStarted: onQueryStartedErrorToast,
      // staleTime: 3 * 60 * 1000,
      middleware: bearerMiddleware,
    }),

    getCallsOverview: builder.query({
      query: (args) =>
        `/dashboards/get-calls-overvue-chart-data?type=${args?.type}`,
      onQueryStarted: onQueryStartedErrorToast,
      // staleTime: 3 * 60 * 1000,
      middleware: bearerMiddleware,
    }),
    getEvents: builder.query({
      query: (args) => `/dashboards/get-events-info?date=${args?.date}`,
      onQueryStarted: onQueryStartedErrorToast,
      // staleTime: 3 * 60 * 1000,
      middleware: bearerMiddleware,
    }),
    callsPagination: builder.query({
      query: (args) =>
        `/dashboards/get-calls?type=${args?.type}&page=${args?.page}`,
      providesTags: ["dashboardcalls"],
      onQueryStarted: onQueryStartedErrorToast,
      // staleTime: 3 * 60 * 1000,
      middleware: bearerMiddleware,
    }),
    callsSearchPagination: builder.query({
      query: (args) =>
        `/dashboards/get-calls?type=${args?.type}&page=${args?.page}&date_range=${args?.range}`,
      providesTags: ["dashboardcalls"],
      onQueryStarted: onQueryStartedErrorToast,
      // staleTime: 3 * 60 * 1000,
      middleware: bearerMiddleware,
    }),
    callsSearch: builder.query({
      query: (args) =>
        `/dashboards/get-calls?type=${args?.type}&searchkey=${args?.search}&date_range=${args?.range}`,
      providesTags: ["dashboardcalls"],
      onQueryStarted: onQueryStartedErrorToast,
      // staleTime: 3 * 60 * 1000,
      middleware: bearerMiddleware,
    }),
    callsSearchPagination: builder.query({
      query: (args) =>
        `/dashboards/get-calls?type=${args?.type}&page=${args?.page}&date_range=${args?.range}`,
      providesTags: ["dashboardcalls"],
      onQueryStarted: onQueryStartedErrorToast,
      // staleTime: 3 * 60 * 1000,
      middleware: bearerMiddleware,
    }),
    getCalls: builder.query({
      query: (args) => `/dashboards/get-calls?type=${args?.type}`,
      providesTags: ["dashboardcalls"],
      onQueryStarted: onQueryStartedErrorToast,
      // staleTime: 3 * 60 * 1000,
      middleware: bearerMiddleware,
    }),
    enquiryTransferSearch: builder.mutation({
      query: (data) => ({
        url: "/enquiries/header-search",
        method: "POST",
        body: data,
        formData: true,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    viewEnquiryDetails: builder.query({
      query: (args) => ({
        url: `/enquiries/enq-complete-details?enq_id=${args?.id}`,
      }),
      onQueryStarted: onQueryStartedErrorToast,
    }),

    // Transfer Enquiries

    acceptEnquiryTransfer: builder.mutation({
      query: (data) => ({
        url: "/enquiries/accept-transfer",
        method: "POST",
        body: data,
        formData: true,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["transfer"],
      middleware: bearerMiddleware,
    }),
    rejectEnquiryTransfer: builder.mutation({
      query: (data) => ({
        url: "/enquiries/reject-transfer",
        method: "POST",
        body: data,
        formData: true,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["transfer"],
      middleware: bearerMiddleware,
    }),
    searchTransferList: builder.query({
      query: (args) => ({
        url: `/enquiries/transfer/list/by-type?req_type=${args?.type}&status=${args?.status}&searchkey=${args?.search}`,
      }),
      providesTags: ["transfer"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    transferListPagination: builder.query({
      query: (args) => ({
        url: `/enquiries/transfer/list/by-type?req_type=${args?.type}&status=${args?.status}&page=${args?.page}`,
      }),
      providesTags: ["transfer"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    transferList: builder.query({
      query: (args) => ({
        url: `/enquiries/transfer/list/by-type?req_type=${args?.type}&status=${args?.status}`,
      }),
      providesTags: ["transfer"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    cancelInvoice1: builder.mutation({
      query: (data) => ({
        url: "/invoices/update-cancel-requests",
        method: "POST",
        body: data,
        formData: true,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["transfer"],
      middleware: bearerMiddleware,
    }),
    cancelProposal1: builder.mutation({
      query: (data) => ({
        url: "/proposals/update-cancel-requests",
        method: "POST",
        body: data,
        formData: true,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["transfer"],
      middleware: bearerMiddleware,
    }),
    // acceptEnquiryTransfer: builder.mutation({
    //   query: (data) => ({
    //     url: "/enquiries/accept-transfer",
    //     method: "POST",
    //     body: data,
    //     formData: true,
    //     onSuccess: (res) => {
    //       console.log("success", res);
    //     },
    //     onError: (err) => {
    //       console.log(err);
    //     },
    //   }),
    //   invalidatesTags: ["transfer"],
    //   middleware: bearerMiddleware,
    // }),
    // rejectEnquiryTransfer: builder.mutation({
    //   query: (data) => ({
    //     url: "/enquiries/reject-transfer",
    //     method: "POST",
    //     body: data,
    //     formData: true,
    //     onSuccess: (res) => {
    //       console.log("success", res);
    //     },
    //     onError: (err) => {
    //       console.log(err);
    //     },
    //   }),
    //   invalidatesTags: ["transfer"],
    //   middleware: bearerMiddleware,
    // }),

    invCancelRequests: builder.query({
      query: (args) => ({
        url: `/invoices/get-cancel-requests?type=${args?.type}`,
      }),
      providesTags: ["cancelInv"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    proCancelRequests: builder.query({
      query: (args) => ({
        url: `/proposals/get-cancel-requests?type=${args?.type}`,
      }),
      providesTags: ["cancelPro"],
      onQueryStarted: onQueryStartedErrorToast,
    }),

    invCancelListPagination: builder.query({
      query: (args) => ({
        url: `/invoices/get-cancel-requests?type=${args?.type}&page=${args?.page}`,
      }),
      providesTags: ["transfer"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    proCancelListPagination: builder.query({
      query: (args) => ({
        url: `/proposals/get-cancel-requests?type=${args?.type}&page=${args?.page}`,
      }),
      providesTags: ["transfer"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    searchProCancelList: builder.query({
      query: (args) => ({
        url: `/proposals/get-cancel-requests?type=${args?.type}&searchkey=${args?.search}`,
      }),
      providesTags: ["transfer"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    searchInvCancelList: builder.query({
      query: (args) => ({
        url: `/invoices/get-cancel-requests?type=${args?.type}&searchkey=${args?.search}`,
      }),
      providesTags: ["transfer"],
      onQueryStarted: onQueryStartedErrorToast,
    }),
    CheckEmail: builder.mutation({
      query: (data) => ({
        url: "/staffs/validate",
        method: "POST",
        body: data,
      }),
      middleware: bearerMiddleware,
    }),
    updateTopicStatus: builder.mutation({
      query: (data) => ({
        url: "/update-topic-status",
        method: "POST",
        body: data,
      }),
      middleware: bearerMiddleware,
      invalidatesTags: ["getUserinfo"]
    }),
    // CheckEmail: builder.mutation({
    //   query: (data) => ({
    //     url: "/enquiries/header-search",
    //     method: "POST",
    //     body: data,

    //   }),
    //   middleware: bearerMiddleware,
    // }),
  }),
});

export const {
  useCheckEmailMutation,
  useSearchProCancelListQuery,
  useLazyInvCancelRequestsQuery,
  useLazyProCancelRequestsQuery,
  useCancelInvoice1Mutation,
  useCancelProposal1Mutation,
  useLazyInvCancelListPaginationQuery,
  useLazyProCancelListPaginationQuery,
  useLazySearchProCancelListQuery,
  useLazySearchInvCancelListQuery ,
  // dashboard
  useGetGeneralInfoQuery,
  useLazyGetCallsOverviewQuery,
  useLazyGetEventsQuery,
  useLazyCallsPaginationQuery,
  useLazyCallsSearchPaginationQuery,
  useLazyCallsSearchQuery,
  useLazyGetCallsQuery,
  useEnquiryTransferSearchMutation,
  useLazyViewEnquiryDetailsQuery,
  // enquiry transfers
  useAcceptEnquiryTransferMutation,
  useLazySearchTransferListQuery,
  useLazyTransferListPaginationQuery,
  useLazyTransferListQuery,
  useRejectEnquiryTransferMutation,
  useVerifyProfileOPTMutation,
  useGetDashboardfDetailsQuery,
 useGetDashboardfDetails2Query,
  useVerifyCompanyDetailsOTPMutation,
  useLazyGetAllCallDetailsQuery,
  useVerifyBankDetailsOTPMutation,
  useDeleteIpAddressMutation,
  useDeleteShiftMutation,
  useUpdateIpAuthMutation,
  useUpdateStaffShiftMutation,
  useUpdateStaffIpMutation,
  useGetUserInfoQuery,
  useLazyGetStaffDetailsQuery,
  useLazyGetStaffListQuery,
  useLazyGetTopsearchesQuery,
  useLazyEnquiryViewQuery,
  useLogoutMutation,
  useAddEnquiryMutation,
  useUploadEnquiriesMutation,
  useGetDraftEnqQuery,
  useApproveDraftEnqMutation,
  useLazyDraftEnqPaginationQuery,
  useDraftEnqSearchMutation,
  useLazyDraftEnqViewQuery,
  useLazyHistoryByDateQuery,
  useLazyGetNewEnqQuery,
  useNewEnqSearchMutation,
  useLazyNewEnqPaginationQuery,
  useAssignEnquiryMutation,
  useLazyRequestEnqsQuery,
  useViewInvoiceQuery,
  useGetAllInvoicesQuery,
  useSearchInvoiceMutation,
  useLazyInvoicesPaginationQuery,
  useLazyZipInvoiceQuery,
  useGetAllProposalsQuery,
  useSearchProposalMutation,
  useLazyProposalsPaginationQuery,
  useViewProposalQuery,
  useLazyGetStaffsQuery,
  useLazyGetAllStaffsQuery,
  useLazyViewStaffQuery,
  useStaffStatusMutation,
  useStaffTransferDetailsMutation,
  useStaffTransferEnquiriesMutation,
  useGetJSONDecodedLogsMutation,
  useUnlockScreenMutation,
  useLockScreenMutation,
  useProjectsListQuery,
  useLazyProjectsPaginationQuery,
  useViewProjectQuery,
  useAddCommentMutation,
  useAddReplyMutation,
  useGetCommentsQuery,
  useUploadAttachmentMutation,
  useAssignMemberMutation,
  useLazyDownloadAttachmentQuery,
  useLazyGetInvoicesAccessKeysQuery,
  useLazyGetInvoicesAccessKeysPaginationQuery,
  useProfileUpdateMutation,
  useCompanyDetailsUpdateMutation,
  useBankDetailsUpdateMutation,
  useUserAgreementUpdateMutation,
  useSentAgreementMutation,
  useLazyDownloadAgreementQuery,
  useLazyProfileSettingsQuery,
  useVerifyOPTMutation,
  useVerifyCompanyOPTMutation,
  useSendOPTMutation,
  useSendCompanyOPTMutation,
  useLazyCompanySettingsQuery,
  useBranchesListQuery,
  useCreateBranchMutation,
  useLazyViewBranchQuery,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
  useLazyManageIpsQuery,
  useAddIpMutation,
  useDeleteIpMutation,
  useVerifyBankMutation,
  useLazyBankSettingsQuery,
  useLazyGetSmtpSettingsQuery,
  useUpdateSmtpMutation,
  useGetProfileDetailsQuery,
  useGetAssignedEnquiriesQuery,
  useGetDropDownDataQuery,
  useGetExtensionsQuery,
  useLazyExtensionViewQuery,
  useStaffListQuery,
  useCreateStaffMutation,
  useLazyStaffsViewQuery,
  useDeleteStaffMutation,
  useUpdateStaffMutation,
  useUpdateStaffIpAuthMutation,
  useUpdateStaffStatusMutation,
  useGetBranchesAndExtensionsQuery,
  useTerminateStaffMutation,
  useInactivateStaffMutation,
  useDeleteAcademicsMutation,
  useTerminatedStaffQuery,
  useGetIpAddressesQuery,
  useInactiveStaffQuery,
  useAddShiftMutation,
  useCreateIpMutation,
  useUpdateTopicStatusMutation
} = api;
