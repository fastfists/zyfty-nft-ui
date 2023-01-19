// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  // apiUrl: 'https://api.dev.zyfty.io/',
  apiUrl: 'http://localhost:5000/',
  map_api_key: 'AIzaSyAfXLngkdMTHRaUbbPw8ya8m_I7AzLAjMo&address',

  sellerAddress: "0x63B060a3E5a89308DB2Da5D16429AB01A65e29D8",
  adminAddress: "0x8c931Af0686fB7C4D0c6046cCdd9A6ceBC6A53AA",

  tokenAddress: "0x76c9ffe55b08f39544ad7b3D5C6b8236F6ed4A54",
  escrowAddress: "0x3917Be4805300c7F0Ded4c3cB8BDd5DE7808247F",
  kycAddress: "0x65D24758B79C70C4c83874020B1cCf4328de3f4e"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
