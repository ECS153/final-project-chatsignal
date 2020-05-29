/* AES */

/*********************************** Constants ***********************************/
/* Multiplication tables */
/*
 * During the Mix step of AES, values from the current state must be multiplied by a
 * constant matrix. This multiplication is done in the GF(2) field, which means a its
 * a bit more complicated than a normal multiplication operation. The following arrays 
 * take advantage of the fact that the matrix being multiplied with the state is constant,
 * and can be reduced to a lookup operation using the state value as the position in
 * the array.
 */
const mul_2 =
[ 0x00,0x02,0x04,0x06,0x08,0x0a,0x0c,0x0e,0x10,0x12,0x14,0x16,0x18,0x1a,0x1c,0x1e,
  0x20,0x22,0x24,0x26,0x28,0x2a,0x2c,0x2e,0x30,0x32,0x34,0x36,0x38,0x3a,0x3c,0x3e,
  0x40,0x42,0x44,0x46,0x48,0x4a,0x4c,0x4e,0x50,0x52,0x54,0x56,0x58,0x5a,0x5c,0x5e,
  0x60,0x62,0x64,0x66,0x68,0x6a,0x6c,0x6e,0x70,0x72,0x74,0x76,0x78,0x7a,0x7c,0x7e,
  0x80,0x82,0x84,0x86,0x88,0x8a,0x8c,0x8e,0x90,0x92,0x94,0x96,0x98,0x9a,0x9c,0x9e,
  0xa0,0xa2,0xa4,0xa6,0xa8,0xaa,0xac,0xae,0xb0,0xb2,0xb4,0xb6,0xb8,0xba,0xbc,0xbe,
  0xc0,0xc2,0xc4,0xc6,0xc8,0xca,0xcc,0xce,0xd0,0xd2,0xd4,0xd6,0xd8,0xda,0xdc,0xde,
  0xe0,0xe2,0xe4,0xe6,0xe8,0xea,0xec,0xee,0xf0,0xf2,0xf4,0xf6,0xf8,0xfa,0xfc,0xfe,
  0x1b,0x19,0x1f,0x1d,0x13,0x11,0x17,0x15,0x0b,0x09,0x0f,0x0d,0x03,0x01,0x07,0x05,
  0x3b,0x39,0x3f,0x3d,0x33,0x31,0x37,0x35,0x2b,0x29,0x2f,0x2d,0x23,0x21,0x27,0x25,
  0x5b,0x59,0x5f,0x5d,0x53,0x51,0x57,0x55,0x4b,0x49,0x4f,0x4d,0x43,0x41,0x47,0x45,
  0x7b,0x79,0x7f,0x7d,0x73,0x71,0x77,0x75,0x6b,0x69,0x6f,0x6d,0x63,0x61,0x67,0x65,
  0x9b,0x99,0x9f,0x9d,0x93,0x91,0x97,0x95,0x8b,0x89,0x8f,0x8d,0x83,0x81,0x87,0x85,
  0xbb,0xb9,0xbf,0xbd,0xb3,0xb1,0xb7,0xb5,0xab,0xa9,0xaf,0xad,0xa3,0xa1,0xa7,0xa5,
  0xdb,0xd9,0xdf,0xdd,0xd3,0xd1,0xd7,0xd5,0xcb,0xc9,0xcf,0xcd,0xc3,0xc1,0xc7,0xc5,
  0xfb,0xf9,0xff,0xfd,0xf3,0xf1,0xf7,0xf5,0xeb,0xe9,0xef,0xed,0xe3,0xe1,0xe7,0xe5
];

const mul_3 = 
[ 
  0x00,0x03,0x06,0x05,0x0c,0x0f,0x0a,0x09,0x18,0x1b,0x1e,0x1d,0x14,0x17,0x12,0x11,
  0x30,0x33,0x36,0x35,0x3c,0x3f,0x3a,0x39,0x28,0x2b,0x2e,0x2d,0x24,0x27,0x22,0x21,
  0x60,0x63,0x66,0x65,0x6c,0x6f,0x6a,0x69,0x78,0x7b,0x7e,0x7d,0x74,0x77,0x72,0x71,
  0x50,0x53,0x56,0x55,0x5c,0x5f,0x5a,0x59,0x48,0x4b,0x4e,0x4d,0x44,0x47,0x42,0x41,
  0xc0,0xc3,0xc6,0xc5,0xcc,0xcf,0xca,0xc9,0xd8,0xdb,0xde,0xdd,0xd4,0xd7,0xd2,0xd1,
  0xf0,0xf3,0xf6,0xf5,0xfc,0xff,0xfa,0xf9,0xe8,0xeb,0xee,0xed,0xe4,0xe7,0xe2,0xe1,
  0xa0,0xa3,0xa6,0xa5,0xac,0xaf,0xaa,0xa9,0xb8,0xbb,0xbe,0xbd,0xb4,0xb7,0xb2,0xb1,
  0x90,0x93,0x96,0x95,0x9c,0x9f,0x9a,0x99,0x88,0x8b,0x8e,0x8d,0x84,0x87,0x82,0x81,
  0x9b,0x98,0x9d,0x9e,0x97,0x94,0x91,0x92,0x83,0x80,0x85,0x86,0x8f,0x8c,0x89,0x8a,
  0xab,0xa8,0xad,0xae,0xa7,0xa4,0xa1,0xa2,0xb3,0xb0,0xb5,0xb6,0xbf,0xbc,0xb9,0xba,
  0xfb,0xf8,0xfd,0xfe,0xf7,0xf4,0xf1,0xf2,0xe3,0xe0,0xe5,0xe6,0xef,0xec,0xe9,0xea,
  0xcb,0xc8,0xcd,0xce,0xc7,0xc4,0xc1,0xc2,0xd3,0xd0,0xd5,0xd6,0xdf,0xdc,0xd9,0xda,
  0x5b,0x58,0x5d,0x5e,0x57,0x54,0x51,0x52,0x43,0x40,0x45,0x46,0x4f,0x4c,0x49,0x4a,
  0x6b,0x68,0x6d,0x6e,0x67,0x64,0x61,0x62,0x73,0x70,0x75,0x76,0x7f,0x7c,0x79,0x7a,
  0x3b,0x38,0x3d,0x3e,0x37,0x34,0x31,0x32,0x23,0x20,0x25,0x26,0x2f,0x2c,0x29,0x2a,
  0x0b,0x08,0x0d,0x0e,0x07,0x04,0x01,0x02,0x13,0x10,0x15,0x16,0x1f,0x1c,0x19,0x1a
];

const mul_9 = 
[
    0x00,0x09,0x12,0x1b,0x24,0x2d,0x36,0x3f,0x48,0x41,0x5a,0x53,0x6c,0x65,0x7e,0x77,
    0x90,0x99,0x82,0x8b,0xb4,0xbd,0xa6,0xaf,0xd8,0xd1,0xca,0xc3,0xfc,0xf5,0xee,0xe7,
    0x3b,0x32,0x29,0x20,0x1f,0x16,0x0d,0x04,0x73,0x7a,0x61,0x68,0x57,0x5e,0x45,0x4c,
    0xab,0xa2,0xb9,0xb0,0x8f,0x86,0x9d,0x94,0xe3,0xea,0xf1,0xf8,0xc7,0xce,0xd5,0xdc,
    0x76,0x7f,0x64,0x6d,0x52,0x5b,0x40,0x49,0x3e,0x37,0x2c,0x25,0x1a,0x13,0x08,0x01,
    0xe6,0xef,0xf4,0xfd,0xc2,0xcb,0xd0,0xd9,0xae,0xa7,0xbc,0xb5,0x8a,0x83,0x98,0x91,
    0x4d,0x44,0x5f,0x56,0x69,0x60,0x7b,0x72,0x05,0x0c,0x17,0x1e,0x21,0x28,0x33,0x3a,
    0xdd,0xd4,0xcf,0xc6,0xf9,0xf0,0xeb,0xe2,0x95,0x9c,0x87,0x8e,0xb1,0xb8,0xa3,0xaa,
    0xec,0xe5,0xfe,0xf7,0xc8,0xc1,0xda,0xd3,0xa4,0xad,0xb6,0xbf,0x80,0x89,0x92,0x9b,
    0x7c,0x75,0x6e,0x67,0x58,0x51,0x4a,0x43,0x34,0x3d,0x26,0x2f,0x10,0x19,0x02,0x0b,
    0xd7,0xde,0xc5,0xcc,0xf3,0xfa,0xe1,0xe8,0x9f,0x96,0x8d,0x84,0xbb,0xb2,0xa9,0xa0,
    0x47,0x4e,0x55,0x5c,0x63,0x6a,0x71,0x78,0x0f,0x06,0x1d,0x14,0x2b,0x22,0x39,0x30,
    0x9a,0x93,0x88,0x81,0xbe,0xb7,0xac,0xa5,0xd2,0xdb,0xc0,0xc9,0xf6,0xff,0xe4,0xed,
    0x0a,0x03,0x18,0x11,0x2e,0x27,0x3c,0x35,0x42,0x4b,0x50,0x59,0x66,0x6f,0x74,0x7d,
    0xa1,0xa8,0xb3,0xba,0x85,0x8c,0x97,0x9e,0xe9,0xe0,0xfb,0xf2,0xcd,0xc4,0xdf,0xd6,
    0x31,0x38,0x23,0x2a,0x15,0x1c,0x07,0x0e,0x79,0x70,0x6b,0x62,0x5d,0x54,0x4f,0x46
];

const mul_11 = 
[
    0x00,0x0b,0x16,0x1d,0x2c,0x27,0x3a,0x31,0x58,0x53,0x4e,0x45,0x74,0x7f,0x62,0x69,
    0xb0,0xbb,0xa6,0xad,0x9c,0x97,0x8a,0x81,0xe8,0xe3,0xfe,0xf5,0xc4,0xcf,0xd2,0xd9,
    0x7b,0x70,0x6d,0x66,0x57,0x5c,0x41,0x4a,0x23,0x28,0x35,0x3e,0x0f,0x04,0x19,0x12,
    0xcb,0xc0,0xdd,0xd6,0xe7,0xec,0xf1,0xfa,0x93,0x98,0x85,0x8e,0xbf,0xb4,0xa9,0xa2,
    0xf6,0xfd,0xe0,0xeb,0xda,0xd1,0xcc,0xc7,0xae,0xa5,0xb8,0xb3,0x82,0x89,0x94,0x9f,
    0x46,0x4d,0x50,0x5b,0x6a,0x61,0x7c,0x77,0x1e,0x15,0x08,0x03,0x32,0x39,0x24,0x2f,
    0x8d,0x86,0x9b,0x90,0xa1,0xaa,0xb7,0xbc,0xd5,0xde,0xc3,0xc8,0xf9,0xf2,0xef,0xe4,
    0x3d,0x36,0x2b,0x20,0x11,0x1a,0x07,0x0c,0x65,0x6e,0x73,0x78,0x49,0x42,0x5f,0x54,
    0xf7,0xfc,0xe1,0xea,0xdb,0xd0,0xcd,0xc6,0xaf,0xa4,0xb9,0xb2,0x83,0x88,0x95,0x9e,
    0x47,0x4c,0x51,0x5a,0x6b,0x60,0x7d,0x76,0x1f,0x14,0x09,0x02,0x33,0x38,0x25,0x2e,
    0x8c,0x87,0x9a,0x91,0xa0,0xab,0xb6,0xbd,0xd4,0xdf,0xc2,0xc9,0xf8,0xf3,0xee,0xe5,
    0x3c,0x37,0x2a,0x21,0x10,0x1b,0x06,0x0d,0x64,0x6f,0x72,0x79,0x48,0x43,0x5e,0x55,
    0x01,0x0a,0x17,0x1c,0x2d,0x26,0x3b,0x30,0x59,0x52,0x4f,0x44,0x75,0x7e,0x63,0x68,
    0xb1,0xba,0xa7,0xac,0x9d,0x96,0x8b,0x80,0xe9,0xe2,0xff,0xf4,0xc5,0xce,0xd3,0xd8,
    0x7a,0x71,0x6c,0x67,0x56,0x5d,0x40,0x4b,0x22,0x29,0x34,0x3f,0x0e,0x05,0x18,0x13,
    0xca,0xc1,0xdc,0xd7,0xe6,0xed,0xf0,0xfb,0x92,0x99,0x84,0x8f,0xbe,0xb5,0xa8,0xa3
];

const mul_13 = 
[
    0x00,0x0d,0x1a,0x17,0x34,0x39,0x2e,0x23,0x68,0x65,0x72,0x7f,0x5c,0x51,0x46,0x4b,
    0xd0,0xdd,0xca,0xc7,0xe4,0xe9,0xfe,0xf3,0xb8,0xb5,0xa2,0xaf,0x8c,0x81,0x96,0x9b,
    0xbb,0xb6,0xa1,0xac,0x8f,0x82,0x95,0x98,0xd3,0xde,0xc9,0xc4,0xe7,0xea,0xfd,0xf0,
    0x6b,0x66,0x71,0x7c,0x5f,0x52,0x45,0x48,0x03,0x0e,0x19,0x14,0x37,0x3a,0x2d,0x20,
    0x6d,0x60,0x77,0x7a,0x59,0x54,0x43,0x4e,0x05,0x08,0x1f,0x12,0x31,0x3c,0x2b,0x26,
    0xbd,0xb0,0xa7,0xaa,0x89,0x84,0x93,0x9e,0xd5,0xd8,0xcf,0xc2,0xe1,0xec,0xfb,0xf6,
    0xd6,0xdb,0xcc,0xc1,0xe2,0xef,0xf8,0xf5,0xbe,0xb3,0xa4,0xa9,0x8a,0x87,0x90,0x9d,
    0x06,0x0b,0x1c,0x11,0x32,0x3f,0x28,0x25,0x6e,0x63,0x74,0x79,0x5a,0x57,0x40,0x4d,
    0xda,0xd7,0xc0,0xcd,0xee,0xe3,0xf4,0xf9,0xb2,0xbf,0xa8,0xa5,0x86,0x8b,0x9c,0x91,
    0x0a,0x07,0x10,0x1d,0x3e,0x33,0x24,0x29,0x62,0x6f,0x78,0x75,0x56,0x5b,0x4c,0x41,
    0x61,0x6c,0x7b,0x76,0x55,0x58,0x4f,0x42,0x09,0x04,0x13,0x1e,0x3d,0x30,0x27,0x2a,
    0xb1,0xbc,0xab,0xa6,0x85,0x88,0x9f,0x92,0xd9,0xd4,0xc3,0xce,0xed,0xe0,0xf7,0xfa,
    0xb7,0xba,0xad,0xa0,0x83,0x8e,0x99,0x94,0xdf,0xd2,0xc5,0xc8,0xeb,0xe6,0xf1,0xfc,
    0x67,0x6a,0x7d,0x70,0x53,0x5e,0x49,0x44,0x0f,0x02,0x15,0x18,0x3b,0x36,0x21,0x2c,
    0x0c,0x01,0x16,0x1b,0x38,0x35,0x22,0x2f,0x64,0x69,0x7e,0x73,0x50,0x5d,0x4a,0x47,
    0xdc,0xd1,0xc6,0xcb,0xe8,0xe5,0xf2,0xff,0xb4,0xb9,0xae,0xa3,0x80,0x8d,0x9a,0x97
];

const mul_14 = 
[
    0x00,0x0e,0x1c,0x12,0x38,0x36,0x24,0x2a,0x70,0x7e,0x6c,0x62,0x48,0x46,0x54,0x5a,
    0xe0,0xee,0xfc,0xf2,0xd8,0xd6,0xc4,0xca,0x90,0x9e,0x8c,0x82,0xa8,0xa6,0xb4,0xba,
    0xdb,0xd5,0xc7,0xc9,0xe3,0xed,0xff,0xf1,0xab,0xa5,0xb7,0xb9,0x93,0x9d,0x8f,0x81,
    0x3b,0x35,0x27,0x29,0x03,0x0d,0x1f,0x11,0x4b,0x45,0x57,0x59,0x73,0x7d,0x6f,0x61,
    0xad,0xa3,0xb1,0xbf,0x95,0x9b,0x89,0x87,0xdd,0xd3,0xc1,0xcf,0xe5,0xeb,0xf9,0xf7,
    0x4d,0x43,0x51,0x5f,0x75,0x7b,0x69,0x67,0x3d,0x33,0x21,0x2f,0x05,0x0b,0x19,0x17,
    0x76,0x78,0x6a,0x64,0x4e,0x40,0x52,0x5c,0x06,0x08,0x1a,0x14,0x3e,0x30,0x22,0x2c,
    0x96,0x98,0x8a,0x84,0xae,0xa0,0xb2,0xbc,0xe6,0xe8,0xfa,0xf4,0xde,0xd0,0xc2,0xcc,
    0x41,0x4f,0x5d,0x53,0x79,0x77,0x65,0x6b,0x31,0x3f,0x2d,0x23,0x09,0x07,0x15,0x1b,
    0xa1,0xaf,0xbd,0xb3,0x99,0x97,0x85,0x8b,0xd1,0xdf,0xcd,0xc3,0xe9,0xe7,0xf5,0xfb,
    0x9a,0x94,0x86,0x88,0xa2,0xac,0xbe,0xb0,0xea,0xe4,0xf6,0xf8,0xd2,0xdc,0xce,0xc0,
    0x7a,0x74,0x66,0x68,0x42,0x4c,0x5e,0x50,0x0a,0x04,0x16,0x18,0x32,0x3c,0x2e,0x20,
    0xec,0xe2,0xf0,0xfe,0xd4,0xda,0xc8,0xc6,0x9c,0x92,0x80,0x8e,0xa4,0xaa,0xb8,0xb6,
    0x0c,0x02,0x10,0x1e,0x34,0x3a,0x28,0x26,0x7c,0x72,0x60,0x6e,0x44,0x4a,0x58,0x56,
    0x37,0x39,0x2b,0x25,0x0f,0x01,0x13,0x1d,0x47,0x49,0x5b,0x55,0x7f,0x71,0x63,0x6d,
    0xd7,0xd9,0xcb,0xc5,0xef,0xe1,0xf3,0xfd,0xa7,0xa9,0xbb,0xb5,0x9f,0x91,0x83,0x8d
];

/* Sub boxes */
/* 
 * These array tables are used in the substitution step. They are a non-linear form
 * of transformation. The inv_sBox is used to undo the sBox transformation
 */
const sBox  = [
  [0x63,0x7c,0x77,0x7b,0xf2,0x6b,0x6f,0xc5,0x30,0x01,0x67,0x2b,0xfe,0xd7,0xab,0x76],
  [0xca,0x82,0xc9,0x7d,0xfa,0x59,0x47,0xf0,0xad,0xd4,0xa2,0xaf,0x9c,0xa4,0x72,0xc0],
  [0xb7,0xfd,0x93,0x26,0x36,0x3f,0xf7,0xcc,0x34,0xa5,0xe5,0xf1,0x71,0xd8,0x31,0x15],
  [0x04,0xc7,0x23,0xc3,0x18,0x96,0x05,0x9a,0x07,0x12,0x80,0xe2,0xeb,0x27,0xb2,0x75],
  [0x09,0x83,0x2c,0x1a,0x1b,0x6e,0x5a,0xa0,0x52,0x3b,0xd6,0xb3,0x29,0xe3,0x2f,0x84],
  [0x53,0xd1,0x00,0xed,0x20,0xfc,0xb1,0x5b,0x6a,0xcb,0xbe,0x39,0x4a,0x4c,0x58,0xcf],
  [0xd0,0xef,0xaa,0xfb,0x43,0x4d,0x33,0x85,0x45,0xf9,0x02,0x7f,0x50,0x3c,0x9f,0xa8],
  [0x51,0xa3,0x40,0x8f,0x92,0x9d,0x38,0xf5,0xbc,0xb6,0xda,0x21,0x10,0xff,0xf3,0xd2],
  [0xcd,0x0c,0x13,0xec,0x5f,0x97,0x44,0x17,0xc4,0xa7,0x7e,0x3d,0x64,0x5d,0x19,0x73],
  [0x60,0x81,0x4f,0xdc,0x22,0x2a,0x90,0x88,0x46,0xee,0xb8,0x14,0xde,0x5e,0x0b,0xdb],
  [0xe0,0x32,0x3a,0x0a,0x49,0x06,0x24,0x5c,0xc2,0xd3,0xac,0x62,0x91,0x95,0xe4,0x79],
  [0xe7,0xc8,0x37,0x6d,0x8d,0xd5,0x4e,0xa9,0x6c,0x56,0xf4,0xea,0x65,0x7a,0xae,0x08],
  [0xba,0x78,0x25,0x2e,0x1c,0xa6,0xb4,0xc6,0xe8,0xdd,0x74,0x1f,0x4b,0xbd,0x8b,0x8a],
  [0x70,0x3e,0xb5,0x66,0x48,0x03,0xf6,0x0e,0x61,0x35,0x57,0xb9,0x86,0xc1,0x1d,0x9e],
  [0xe1,0xf8,0x98,0x11,0x69,0xd9,0x8e,0x94,0x9b,0x1e,0x87,0xe9,0xce,0x55,0x28,0xdf],
  [0x8c,0xa1,0x89,0x0d,0xbf,0xe6,0x42,0x68,0x41,0x99,0x2d,0x0f,0xb0,0x54,0xbb,0x16]
];
const inv_sBox = 
[
   [0x52,0x09,0x6A,0xD5,0x30,0x36,0xA5,0x38,0xBF,0x40,0xA3,0x9E,0x81,0xF3,0xD7,0xFB],
   [0x7C,0xE3,0x39,0x82,0x9B,0x2F,0xFF,0x87,0x34,0x8E,0x43,0x44,0xC4,0xDE,0xE9,0xCB],
   [0x54,0x7B,0x94,0x32,0xA6,0xC2,0x23,0x3D,0xEE,0x4C,0x95,0x0B,0x42,0xFA,0xC3,0x4E],
   [0x08,0x2E,0xA1,0x66,0x28,0xD9,0x24,0xB2,0x76,0x5B,0xA2,0x49,0x6D,0x8B,0xD1,0x25],
   [0x72,0xF8,0xF6,0x64,0x86,0x68,0x98,0x16,0xD4,0xA4,0x5C,0xCC,0x5D,0x65,0xB6,0x92],
   [0x6C,0x70,0x48,0x50,0xFD,0xED,0xB9,0xDA,0x5E,0x15,0x46,0x57,0xA7,0x8D,0x9D,0x84],
   [0x90,0xD8,0xAB,0x00,0x8C,0xBC,0xD3,0x0A,0xF7,0xE4,0x58,0x05,0xB8,0xB3,0x45,0x06],
   [0xD0,0x2C,0x1E,0x8F,0xCA,0x3F,0x0F,0x02,0xC1,0xAF,0xBD,0x03,0x01,0x13,0x8A,0x6B],
   [0x3A,0x91,0x11,0x41,0x4F,0x67,0xDC,0xEA,0x97,0xF2,0xCF,0xCE,0xF0,0xB4,0xE6,0x73],
   [0x96,0xAC,0x74,0x22,0xE7,0xAD,0x35,0x85,0xE2,0xF9,0x37,0xE8,0x1C,0x75,0xDF,0x6E],
   [0x47,0xF1,0x1A,0x71,0x1D,0x29,0xC5,0x89,0x6F,0xB7,0x62,0x0E,0xAA,0x18,0xBE,0x1B],
   [0xFC,0x56,0x3E,0x4B,0xC6,0xD2,0x79,0x20,0x9A,0xDB,0xC0,0xFE,0x78,0xCD,0x5A,0xF4],
   [0x1F,0xDD,0xA8,0x33,0x88,0x07,0xC7,0x31,0xB1,0x12,0x10,0x59,0x27,0x80,0xEC,0x5F],
   [0x60,0x51,0x7F,0xA9,0x19,0xB5,0x4A,0x0D,0x2D,0xE5,0x7A,0x9F,0x93,0xC9,0x9C,0xEF],
   [0xA0,0xE0,0x3B,0x4D,0xAE,0x2A,0xF5,0xB0,0xC8,0xEB,0xBB,0x3C,0x83,0x53,0x99,0x61],
   [0x17,0x2B,0x04,0x7E,0xBA,0x77,0xD6,0x26,0xE1,0x69,0x14,0x63,0x55,0x21,0x0C,0x7D]
];

/* rConstant */
/* 
 * This array is used in Key expansion
 */
const rCon = [1,2,4,8,16,32,64,128];
/*********************************************************************************/

/******************************** Helper Functions *******************************/
// // Generates Key Array from hex array
// // Inputs: 
// //        -key: empty 256 bit key array split into 4 sections of 8 Words of 32 bits
// //        -hexArray: 256 bit int array split into 8 Words of 32 bits
// function keyFromHex(key, hexArray) {
//   for(idex_hKey = 0; idex_hKey < hexArray.length; idex_hKey++) {
//     for(jdex_hKey = 0; jdex_hKey < 4; jdex_hKey++) {
//       key[idex_hKey][jdex_hKey] = (hexArray[idex_hKey] >> ((3-jdex_hKey)*8)) & 0xff
//     }
//   }
// }


/* WordToArray
 * Input: a 4 byte number
 * Return: a 4 element array with 1 byte per element
 * 
 * Splits a 4 byte word into an array of bytes
 */
function WordToArray(word) { // create 4 element array consisting of 8bit sections of sections of 32 bit word
  let wordArray = [(word>>24)&0xff,(word>>16)&0xff,(word>>8)&0xff,word&0xff];
  return wordArray;
}

/* ArrayToWord
 * Input: a 4 element array with 1 byte per element
 * Return: a 4 byte number
 * 
 * Joins a byte array into a 4 byte word
 */
function ArrayToWord(wordArray) {
  let word = (wordArray[3]) + (wordArray[2]<<8)+(wordArray[1]<<16)+(wordArray[0]*Math.pow(2,24));
  return word;
}

/* sub
 * Input: 1 Byte stored in number
 * Return: 1 Byte stored in number returned from sBox
 * 
 * Takes byte and splits it into two nibbles. Uses most sig entry as the row in sBox 
 * and least sig for col.
 */
function sub(b) {
  let row = (b >> 4) & 0xf;
  let col = b & 0xf;
  return sBox[row][col];
}

/* invSub
 * Input: 1 Byte stored in number
 * Return: 1 Byte stored in number returned from inv_sBox
 * 
 * Takes byte and splits it into two nibbles. Uses most sig entry as the row in inv_sBox 
 * and least sig for col.
 */
function invSub(b) {
  let row = (b >> 4) & 0xf;
  let col = b & 0xf;
  return inv_sBox[row][col];
}

/* StringToState 
 * Input: At most 16 char string
 * Return: 4x4 array of ints
 * 
 * Populate elements of array with the int values of the characters of the string.
 * Elements populate top to bottom left to righ:
 * _____________
 * |a |e |i |m |
 * |__|__|__|__|
 * |b |f |j |n |
 * |__|__|__|__|
 * |c |g |k |o |
 * |__|__|__|__|
 * |d |h |l |p |
 * |__|__|__|__|
 */
function StringToState(stateString) {
  let state = [Array(4),Array(4),Array(4),Array(4)];
  for(let row = 0; row<state.length; row++) {
    for(let col = 0; col<state.length; col++) { 
      state[row][col] = (stateString.charCodeAt(col+row*4));
      if(isNaN(state[row][col])) {
        state[row][col] = 0;
      }
    }
  }
  return state;
}
// save as a hex string with no leading 0x
function HexToState(stateHexString) {
  let state = [Array(4),Array(4),Array(4),Array(4)];
  for(let col = 0; col<state.length; col++) {
    for(let row = 0; row<state.length; row++) { 
      state[row][col] = Number.parseInt(stateHexString.substr(row*2+col*8,2), 16);
      if(isNaN(state[row][col])) {
        state[row][col] = 0;
      }
    }
  }
  return state;
}

function StateToHexString(state) {
  let enc_msg = "";
  for(let idex_print = 0; idex_print<state.length; idex_print++) {
    for(let jdex_print = 0; jdex_print<state[idex_print].length; jdex_print++) { 
      let nextVal = "";
      if(state[jdex_print][idex_print]<16) {
        nextVal+="0";
      }
      nextVal += state[jdex_print][idex_print].toString(16);
      enc_msg = enc_msg + nextVal;
    }
  }
  return enc_msg;
}

function StringToKey(keyString) {
  let key = new Uint32Array(8);
  let curWord = Array(4);
  for(let row_key = 0; row_key<key.length; row_key++) {
    for(let col_key = 0; col_key<4; col_key++) { 
      curWord[col_key] = keyString.charCodeAt(col_key+row_key*4)
      if(isNaN(curWord[col_key])) {
        curWord[col_key] = 0;
      }
    }
    key[row_key] = ArrayToWord(curWord);
  }
  return key;
}


function toStringState(curState) {
  let enc_msg = "";
  for(let idex_print = 0; idex_print<curState.length; idex_print++) {
    for(let jdex_print = 0; jdex_print<curState[idex_print].length; jdex_print++) { 
      enc_msg = enc_msg + String.fromCharCode(curState[idex_print][jdex_print]);
    }
  }
  return enc_msg;
}

function printHex(curState) {
  let enc_msg = "";
  for(let idex_print = 0; idex_print<curState.length; idex_print++) {
    for(let jdex_print = 0; jdex_print<curState[idex_print].length; jdex_print++) { 
      enc_msg = enc_msg +curState[idex_print][jdex_print].toString(16);
    }
  }
  return enc_msg;
}

function splitMessage(fullMessage) {
  var messageArray = [];
  var slicer;
  while (fullMessage.length > 16) {
    slicer = fullMessage.slice(0,16) // 0 - 15
    messageArray.push(slicer)
    fullMessage = fullMessage.substring(16);
  }
  messageArray.push(fullMessage);
  return messageArray;
}

function splitEncodedMessage(fullMessage) {
  var messageArray = [];
  var slicer;
  while (fullMessage.length > 32) {
    slicer = fullMessage.slice(0,32) // 0 - 15
    messageArray.push(slicer)
    fullMessage = fullMessage.substring(32);
  }
  messageArray.push(fullMessage);
  return messageArray;
}

/*********************************************************************************/

/********************************* Key Expansion *********************************/
/* RotWord
 * Input: Array containing 4 bytes, 1 byte per element
 * Return: nothing
 * 
 * Circularly rotates array
 */
function RotWord(wordArray) {
  let rot = wordArray;
  let tempRot = rot[0];
  wordArray[0] = rot[1];
  wordArray[1] = rot[2];
  wordArray[2] = rot[3];
  wordArray[3] = tempRot;
}

/* SubWord
 * Input: Array containing 4 bytes, 1 byte per element
 * Return: nothing
 * 
 * Substitutes all bytes of a word using sBox transformation
 */
function SubWord(wordArray) {
  for(let idex_subW = 0; idex_subW < wordArray.length; idex_subW ++) {
    wordArray[idex_subW] = sub(wordArray[idex_subW]);
  }
}

/* ExpandKey
 * Input: 256 bit key split into an 8 element array of 32 bit words
 * Return: W, a 60 element array of 4 bit words that represent the expanded key
 * 
 * Method: 
 * Iterate through expanded key array W. 
 * If the current iteration is less than the number of words in the key (N):
 *    Set that entry in W to the corresponding entry of key
 * Else if the current iteration is greater than N & is evenly divisible by N:
 *    Set that entry in W equal to the previous entry, then rotate it, sub it, and
 *    Xor the most significant byte of it with rCon entry i/N, then Xor it with
 *    the entry N before the current.
 * Else if the current entry is greater than N and the modulo of N is 4:
 *    Set that entry in W equal to the previous entry, then sub it, then Xor it with
 *    the entry N before the current.
 * Otherwise, set that entry in W equal to the previous entry, then Xor it with
 *    the entry N before the current.
 */
function ExpandKey(key) {
  let N = key.length; // 256bit key word count (32bit word) (8)
  let W = Array(60);
  for(let idex_word = 0; idex_word < W.length; idex_word++) { // iterate through each word of key
    if(idex_word < N) {
      W[idex_word] = ArrayToWord(key[idex_word]);
    } else if(idex_word>=N && idex_word%N === 0) {
      let wordArray = WordToArray(W[idex_word-1]);
      RotWord(wordArray);
      SubWord(wordArray);
      let aWord = ArrayToWord(wordArray);
      let xRes = aWord ^ (rCon[idex_word/N-1]<<24);
      W[idex_word] = W[idex_word-N] ^ (xRes);
    } else if(idex_word>=N && idex_word%N === 4) {
      let wordArray = WordToArray(W[idex_word-1]);
      SubWord(wordArray);
      W[idex_word] = W[idex_word-N] ^ ArrayToWord(wordArray);
    } else {
      W[idex_word] = W[idex_word-N] ^ W[idex_word-1];
    }
  }
  return W;
}
/*********************************************************************************/


/********************************** Encryption ***********************************/

function AddRoundKey(stateArray,rKey) {
  let keyWords = [WordToArray(rKey[0]),
                  WordToArray(rKey[1]),
                  WordToArray(rKey[2]),
                  WordToArray(rKey[3]),
                 ]
  for(let idex_add = 0; idex_add<stateArray.length; idex_add++) {
    for(let jdex_add = 0; jdex_add<stateArray[idex_add].length; jdex_add++) { 
      stateArray[idex_add][jdex_add] = stateArray[idex_add][jdex_add] ^ keyWords[idex_add][jdex_add];
    }
  }
}

function SubBytes(stateArray) {
  for(let idex_sub = 0; idex_sub<stateArray.length; idex_sub++) {
    for(let jdex_sub = 0; jdex_sub<stateArray[idex_sub].length; jdex_sub++) {
      stateArray[idex_sub][jdex_sub] = sub(stateArray[idex_sub][jdex_sub]);
    }
  }
}

function ShiftRows(stateArray,rKey) {
  for(let idex_shift = 0; idex_shift<stateArray.length; idex_shift++) {
    for(let jdex_shift = 0; jdex_shift<idex_shift; jdex_shift++) {
      let temp = stateArray[0][idex_shift];
      stateArray[0][idex_shift] = stateArray[1][idex_shift];
      stateArray[1][idex_shift] = stateArray[2][idex_shift];
      stateArray[2][idex_shift] = stateArray[3][idex_shift];
      stateArray[3][idex_shift] = temp;
    }
  }
}

function MixColumns(stateArray,rKey) {

  for(let jdex_mix = 0; jdex_mix<4; jdex_mix++) {
    let b0 = mul_2[stateArray[jdex_mix][0]]
           ^ mul_3[stateArray[jdex_mix][1]]
           ^ stateArray[jdex_mix][2]
           ^ stateArray[jdex_mix][3];

    let b1 = stateArray[jdex_mix][0]
           ^ mul_2[stateArray[jdex_mix][1]]
           ^ mul_3[stateArray[jdex_mix][2]]
           ^ stateArray[jdex_mix][3];

    let b2 = [stateArray[jdex_mix][0]]
           ^ [stateArray[jdex_mix][1]]
           ^ mul_2[stateArray[jdex_mix][2]]
           ^ mul_3[stateArray[jdex_mix][3]];

    let b3 = mul_3[stateArray[jdex_mix][0]]
           ^ stateArray[jdex_mix][1]
           ^ stateArray[jdex_mix][2]
           ^ mul_2[stateArray[jdex_mix][3]];
    stateArray[jdex_mix][0] = b0;
    stateArray[jdex_mix][1] = b1;
    stateArray[jdex_mix][2] = b2;
    stateArray[jdex_mix][3] = b3;
  }
}


export function AES_Encrypt(message,sKey) {
  var e_message = '';
  let key = StringToKey(sKey);
  let rKeys = ExpandKey(key);
  let msgArray = splitMessage(message);
  for(let msg in msgArray) {
    let state = StringToState(msgArray[msg]);
    AddRoundKey(state,rKeys[0]);
    for(let i = 1; i <= 13; i++) {
      SubBytes(state);
      ShiftRows(state);
      MixColumns(state);
      AddRoundKey(state,rKeys[i]);
    }
    SubBytes(state);
    ShiftRows(state);
    AddRoundKey(state,rKeys[14]);
    e_message += StateToHexString(state);
  }
  return e_message;
}

/*********************************************************************************/

/********************************** Decryption ***********************************/
function invSubBytes(stateArray) {
  for(let idex_sub = 0; idex_sub<stateArray.length; idex_sub++) {
    for(let jdex_sub = 0; jdex_sub<stateArray[idex_sub].length; jdex_sub++) {
      stateArray[idex_sub][jdex_sub] = invSub(stateArray[idex_sub][jdex_sub]);
    }
  }
}


function invShiftRows(stateArray) {
  for(let idex_shift = 0; idex_shift<stateArray.length; idex_shift++) {
    for(let jdex_shift = 0; jdex_shift<idex_shift; jdex_shift++) {
      let temp = stateArray[3][idex_shift];
      stateArray[3][idex_shift] = stateArray[2][idex_shift];
      stateArray[2][idex_shift] = stateArray[1][idex_shift];
      stateArray[1][idex_shift] = stateArray[0][idex_shift];
      stateArray[0][idex_shift] = temp;
    }
  }
}

function invMixColumns(stateArray,rKey) {

  for(let jdex_mix = 0; jdex_mix<4; jdex_mix++) {
    let b0 = mul_14[stateArray[jdex_mix][0]]
           ^ mul_11[stateArray[jdex_mix][1]]
           ^ mul_13[stateArray[jdex_mix][2]]
           ^ mul_9[stateArray[jdex_mix][3]];

    let b1 = mul_9[stateArray[jdex_mix][0]]
           ^ mul_14[stateArray[jdex_mix][1]]
           ^ mul_11[stateArray[jdex_mix][2]]
           ^ mul_13[stateArray[jdex_mix][3]];

    let b2 = mul_13[stateArray[jdex_mix][0]]
           ^ mul_9[stateArray[jdex_mix][1]]
           ^ mul_14[stateArray[jdex_mix][2]]
           ^ mul_11[stateArray[jdex_mix][3]];

    let b3 = mul_11[stateArray[jdex_mix][0]]
           ^ mul_13[stateArray[jdex_mix][1]]
           ^ mul_9[stateArray[jdex_mix][2]]
           ^ mul_14[stateArray[jdex_mix][3]];
    stateArray[jdex_mix][0] = b0;
    stateArray[jdex_mix][1] = b1;
    stateArray[jdex_mix][2] = b2;
    stateArray[jdex_mix][3] = b3;
  }
}

export function AES_Decrypt(message,sKey) {
  let key = StringToKey(sKey);
  let rKeys = ExpandKey(key);
  let d_message = '';
  let msgArray = splitEncodedMessage(message);
  for(let msg in msgArray) {
    let state = HexToState(msgArray[msg]);
    AddRoundKey(state,rKeys[14]);
    for(let i = 13; i > 0; i--) {
      invShiftRows(state);
      invSubBytes(state);
      AddRoundKey(state,rKeys[i]);
      invMixColumns(state);
    }
    invShiftRows(state);
    invSubBytes(state);
    AddRoundKey(state,rKeys[0]);
    d_message+=toStringState(state);
  }
  return d_message;
}
/*********************************************************************************/

let e = AES_Encrypt("hi","key");
console.log(e);
console.log(AES_Decrypt(e,"key"));