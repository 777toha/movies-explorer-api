declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        name: string;
      };
    }

    export interface Response {
      send: {
        massage: string
      }
      status: number
    }
  }
}
