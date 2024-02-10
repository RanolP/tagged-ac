export type Result<T> =
  | { ok: true; value: T }
  | {
      ok: false;
      errors: Record<
        string,
        | string
        | Record<
            string,
            string | string[] | Record<string | number | symbol, unknown>
          >
      >;
    };

export type ApiResponse<T> = Promise<Result<T>>;
