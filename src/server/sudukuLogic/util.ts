/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

export const Util = {

   copyGrid(from: any, to: any) {
    for (let i = 0; i < from.length; i++) {
      to[i] = [...from[i]];
    }
  }
  
};
