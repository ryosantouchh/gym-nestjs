import { HttpStatus } from '@nestjs/common';

export type HttpResponseType = {
  statusCode: HttpStatus;
  message: string;
  data?: Record<string, unknown> | unknown;
};

export class BaseHttpResponse {
  readonly statusCode: HttpStatus;
  readonly message: string;

  constructor({ statusCode, message }: HttpResponseType) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class HttpResponse<TResponseData> extends BaseHttpResponse {
  readonly data: TResponseData | Record<string, unknown> | unknown;

  constructor({ statusCode, message, data }: HttpResponseType) {
    super({ statusCode, message });
    this.data = data;
  }
}

export class OkHttpResponse<TResponseData> extends HttpResponse<TResponseData> {
  constructor({ message, data }: HttpResponseType) {
    super({ statusCode: HttpStatus.OK, message, data });
  }
}
