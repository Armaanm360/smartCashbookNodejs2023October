import AbstractService from '../../abstract/abstract.service';

class TransService extends AbstractService {
  public async createServiceTrans(payload: any) {
    const userid = payload[0].user_id;
    const requestdata = payload;

    const dbdata = await this.db('transactions').where('user_id', userid);
    console.log(dbdata.length);

    const objA = dbdata;
    const objB = requestdata;

    if (!dbdata.length) {
      await this.db('transactions').insert(objB);

      return {
        success: true,
        code: 201,
        message: 'Data Inserted Successfully',
        data: dbdata,
      };
    } else {
      const difference = [];

      for (const itemB of objB) {
        const itemA = objA.find(
          (item) => item.from_app_id === itemB.from_app_id
        );
        if (!itemA) {
          difference.push(itemB);
        }
      }

      const objectC = {
        difference,
      };

      if (difference.length === 0) {
        return {
          success: true,
          code: 201,
          message: 'Data Already Exported',
          // data: requestdata,
        };
      } else {
        const newinserted = await this.db('transactions').insert(difference);
        return {
          success: true,
          code: 201,
          message: 'Data Exported Successfully',
          data: newinserted,
        };
      }
    }
  }

  public async listServiceTrans(userid: number | any) {
    const data = await this.db('transactions').where('user_id', userid);

    return {
      success: true,
      code: 201,
      message: 'Data Fetched Successfully',
      data: { data },
    };
  }
}

export default TransService;
