import { ERROR_MESSAGE } from "./Message";

export const ProcessApiError = (error: any, controller?: AbortController) => {
   if (controller && controller.signal.aborted) {
      return "aborted";
   }

   if (typeof error !== "object") throw new error(ERROR_MESSAGE.api);
   const message = error?.message ?? ERROR_MESSAGE.api;
   if (!Object.prototype.hasOwnProperty.call(error, "response")) {
      throw new Error(message);
   }

   if (!Object.prototype.hasOwnProperty.call(error.response, "data")) {
      throw new Error(message);
   }

   if (!error.response.data) {
      throw new Error(message);
   }

   if (typeof error.response.data === "object") {
      Object.keys(error.response.data).forEach((key) => {
         let errors: string[] = [];
         errors = errors.concat(error.response.data[key]);

         throw new Error(errors.join("\n"));
      });
   }

   if (error.response.status === 401) {
      return undefined;
   }

   throw new Error(message);
};
