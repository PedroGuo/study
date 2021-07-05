interface AdapterOption  {
    action: string
    body: FormData,
    headers?: object
    withCredentials?: string
    onProgress: (e: Event) => void
    onSuccess: (body: Body) => void
    onError: (e: Error) => void
}

function getError(action: string, xhr: XMLHttpRequest ): Error{
  let msg: string;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `fail to post ${action} ${xhr.status}`;
  }

  const err = new Error(msg);
  // err['status'] = xhr.status;
  // err['method'] = "post";
  // err['url'] = action;
  return err;
}

function getBody(xhr: XMLHttpRequest): Body {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}



function upload(option: AdapterOption) {
  const xhr = new XMLHttpRequest();
  const action = option.action;

  if (xhr.upload) {
    xhr.upload.onprogress = option.onProgress;
  }


  xhr.onerror = () => option.onError(getError(action, xhr))
  

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, xhr));
    }

    option.onSuccess(getBody(xhr));
  };

  xhr.open("post", action, true);

  if (option.withCredentials && "withCredentials" in xhr) {
    xhr.withCredentials = true;
  }

  const headers = option.headers || {};

  for (let name in headers) {
    if (headers.hasOwnProperty(name) && headers[name] !== null) {
      xhr.setRequestHeader(name, headers[name]);
    }
  }
  xhr.send(option.body);
  return xhr;
}


export const createAdapter = () => {
  if (typeof XMLHttpRequest !== "undefined") {
    return upload
  }
};