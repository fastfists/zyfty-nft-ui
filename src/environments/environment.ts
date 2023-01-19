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

  tokenAddress: "0x9Dae7312E6ddF860FbC07ff35567fA43b69045cd",
  escrowAddress: "0x912da5e6BBABc1D45610706783B4CFEf6ACB5F0f",
  kycAddress: "0xcbB28E25754C9235ac7BaBB0c997d9Eb383B39A2"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
