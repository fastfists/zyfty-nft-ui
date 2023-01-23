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

  tokenAddress: "0xC3D1d53213080fA05011Ec939163d02f25cefC58",
  escrowAddress: "0xEbe8Ac5cbd9f69941CB2FB985f2de05470F1d5E3",
  kycAddress: "0x75B58a19a2d36b0aAb69fFFb37824A50DEEEBDAe"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
