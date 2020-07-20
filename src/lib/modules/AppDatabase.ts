import Dexie from 'dexie';
import { DEVICE_TOKEN_KEY } from '../constants/common';
import { DATABASE_NAME, DATABASE_VERSION } from '../../configs/db';
import { CredentialFields } from '../../models/ServerFields';

export enum TableName {
  META = 'meta',
}

export enum AccessMode {
  RW = 'rw',
  RWO = 'rw!', // read/write only
  R = 'r',
  RO = 'r!', // read only
}

export default class AppDatabase extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  [TableName.META]: Dexie.Table<AppMeta, number>; // number = type of the primkey
  // ...other tables goes here...

  private static instance: AppDatabase;

  private constructor() {
    super(DATABASE_NAME);
    this.version(DATABASE_VERSION).stores({
      [TableName.META]: `++id, &${DEVICE_TOKEN_KEY}, createdAt`,
      // ...other tables goes here...
    });
    // The following line is needed if your typescript
    // is compiled using babel instead of tsc:
    this[TableName.META] = this.table(TableName.META);
  }

  static getInstance() {
    if (!AppDatabase.instance) {
      AppDatabase.instance = new AppDatabase();
    }
    return AppDatabase.instance;
  }
}

interface AppMeta {
  id?: number;
  [CredentialFields.deviceToken]: string;
  createdAt: Date; // 앱을 설치한 날짜
}

export async function getDbAndTable(tableName: TableName) {
  const db = AppDatabase.getInstance();
  const table = await db[tableName];
  return { db, table };
}
