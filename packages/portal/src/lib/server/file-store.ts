import { type Bucket, Image } from "@daicol/files-storage";
import { env } from "$env/dynamic/private";
import logger from "$lib/server/log.ts";

const MINIO_ENDPOINT = env.MINIO_ENDPOINT;
const MINIO_PORT = env.MINIO_PORT;
const MINIO_ACCESS_KEY = env.MINIO_ACCESS_KEY;
const MINIO_SECRET_KEY = env.MINIO_SECRET_KEY;

logger.info(`MINIO_ENDPOINT: ${MINIO_ENDPOINT}`);
logger.info(`MINIO_PORT: ${MINIO_PORT}`);
logger.info(`MINIO_ACCESS_KEY: ${MINIO_ACCESS_KEY}`);
logger.info(`MINIO_SECRET_KEY: ${MINIO_SECRET_KEY}`);

const storeBucket: Bucket = new Image(
  MINIO_ENDPOINT,
  +MINIO_PORT,
  MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY,
);

export default storeBucket;
