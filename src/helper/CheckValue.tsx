export const spaceRegExp = /\s/;

export const IsEmptyString = (value: string | undefined | number) => {
   const newValue = value?.toString();
   if (newValue?.trim() === "" || !value) {
      return true;
   }
   return false;
};
