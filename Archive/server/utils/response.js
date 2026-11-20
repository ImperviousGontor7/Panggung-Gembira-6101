export function success(
  res,
  data = null,
  message = "Success",
  status = 200,
  meta = undefined,
) {
  const payload = {
    success: true,
    message,
    data,
  };

  if (
    meta !== undefined &&
    meta !== null
  ) {
    payload.meta = meta;
  }

  return res
    .status(status)
    .json(payload);
}

export function error(
  res,
  message = "Error",
  status = 400,
  details = undefined,
) {
  const payload = {
    success: false,
    message,
  };

  if (
    details !== undefined &&
    details !== null
  ) {
    payload.details =
      details;
  }

  return res
    .status(status)
    .json(payload);
}

export function created(
  res,
  data = null,
  message = "Created successfully",
  meta = undefined,
) {
  return success(
    res,
    data,
    message,
    201,
    meta,
  );
}

export function accepted(
  res,
  data = null,
  message = "Request accepted",
  meta = undefined,
) {
  return success(
    res,
    data,
    message,
    202,
    meta,
  );
}

export function noContent(res) {
  return res
    .status(204)
    .send();
}

export function paginated(
  res,
  data,
  pagination,
  message = "Data berhasil diambil",
) {
  return success(
    res,
    data,
    message,
    200,
    pagination,
  );
}

export default {
  success,
  error,
  created,
  accepted,
  noContent,
  paginated,
};