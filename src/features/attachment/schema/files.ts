import { z } from 'zod';
import { ACCEPTED_FILE_FORMATS, MAX_FILE_SIZE } from '../constants';
import { sizeInMB } from '../utils/size';

export const filesSchema = z
  .custom<FileList>()
  .transform((files) => Array.from(files))
  .transform((files) => files.filter((file) => file.size > 0))
  .refine(
    (files) => files.every((file) => sizeInMB(file.size) <= MAX_FILE_SIZE),
    `The maximum file size is ${MAX_FILE_SIZE}MB`
  )
  .refine(
    (files) => files.every((file) => ACCEPTED_FILE_FORMATS.includes(file.type)),
    'File type is not supported'
  )
  .refine((files) => files.length !== 0, 'File is required');
