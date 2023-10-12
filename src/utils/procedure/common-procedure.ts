import { db } from '../../app/database';

const callSingleParamStoredProcedure = async (
  procedureName: string,
  id: number
) => {
  try {
    const result = await db.raw(`CALL ${procedureName}(?)`, [id]);

    return result[0][0];
  } catch (error) {
    throw error;
  }
};

const callSingleStatusParamWithLimitSkipStoredProcedure = async (
  procedureName: string,
  status: string,
  limit: number = 1000,
  skip: number = 0
) => {
  try {
    const result = await db.raw(`CALL ${procedureName}(?,?,?)`, [
      status,
      limit,
      skip,
    ]);

    return result[0][0];
  } catch (error) {
    throw error;
  }
};

export {
  callSingleParamStoredProcedure,
  callSingleStatusParamWithLimitSkipStoredProcedure,
};
