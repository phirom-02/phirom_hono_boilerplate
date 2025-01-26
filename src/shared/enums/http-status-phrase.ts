enum HttpStatusPhrases {
  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.3
   *
   * The request has been received but not yet acted upon. It is non-committal, meaning that there is no way in HTTP to later send an asynchronous response indicating the outcome of processing the request. It is intended for cases where another process or server handles the request, or for batch processing.
   */
  ACCEPTED = "Accepted",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.3
   *
   * This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.
   */
  BAD_GATEWAY = "Bad Gateway",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.1
   *
   * This response means that server could not understand the request due to invalid syntax.
   */
  BAD_REQUEST = "Bad Request",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.8
   *
   * This response is sent when a request conflicts with the current state of the server.
   */
  CONFLICT = "Conflict",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.2.1
   *
   * This interim response indicates that everything so far is OK and that the client should continue with the request or ignore it if it is already finished.
   */
  CONTINUE = "Continue",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.2
   *
   * The request has succeeded and a new resource has been created as a result of it. This is typically the response sent after a PUT request.
   */
  CREATED = "Created",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.14
   *
   * This response code means the expectation indicated by the Expect request header field can't be met by the server.
   */
  EXPECTATION_FAILED = "Expectation Failed",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.5
   *
   * The request failed due to failure of a previous request.
   */
  FAILED_DEPENDENCY = "Failed Dependency",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.3
   *
   * The client does not have access rights to the content, i.e. they are unauthorized, so server is rejecting to give proper response. Unlike 401, the client's identity is known to the server.
   */
  FORBIDDEN = "Forbidden",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.5
   *
   * This error response is given when the server is acting as a gateway and cannot get a response in time.
   */
  GATEWAY_TIMEOUT = "Gateway Timeout",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.9
   *
   * This response would be sent when the requested content has been permanently deleted from the server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for "limited-time, promotional services". APIs should not feel compelled to indicate resources that have been deleted with this status code.
   */
  GONE = "Gone",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.2
   *
   * The HTTP version used in the request is not supported by the server.
   */
  HTTP_VERSION_NOT_SUPPORTED = "HTTP Version Not Supported",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2324#section-2.3.2
   *
   * Any attempt to brew coffee with a teapot should result in the error code "418 I'm a teapot". The resulting entity body MAY be short and stout.
   */
  IM_A_TEAPOT = "I'm a teapot",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.6
   *
   * The 507 (Insufficient Storage) status code means the method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request. This condition is considered to be temporary. If the request which received this status code was the result of a user action, the request MUST NOT be repeated until it is requested by a separate user action.
   */
  INSUFFICIENT_SPACE_ON_RESOURCE = "Insufficient Space on Resource",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.6
   *
   * The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.
   */
  INSUFFICIENT_STORAGE = "Insufficient Storage",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.1
   *
   * The server encountered an unexpected condition that prevented it from fulfilling the request.
   */
  INTERNAL_SERVER_ERROR = "Internal Server Error",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.10
   *
   * The server rejected the request because the Content-Length header field is not defined and the server requires it.
   */
  LENGTH_REQUIRED = "Length Required",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.4
   *
   * The resource that is being accessed is locked.
   */
  LOCKED = "Locked",

  /**
   * @deprecated
   * Official Documentation @ https://tools.ietf.org/rfcdiff?difftype=--hwdiff&url2=draft-ietf-webdav-protocol-06.txt
   *
   * A deprecated response used by the Spring Framework when a method has failed.
   */
  METHOD_FAILURE = "Method Failure", // Deprecated

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.5
   *
   * The request method is known by the server but has been disabled and cannot be used. For example, an API may forbid DELETE-ing a resource. The two mandatory methods, GET and HEAD, must never be disabled and should not return this error code.
   */
  METHOD_NOT_ALLOWED = "Method Not Allowed",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.2
   *
   * This response code means that URI of requested resource has been changed. Probably, new URI would be given in the response.
   */
  MOVED_PERMANENTLY = "Moved Permanently",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.3
   *
   * This response code means that URI of requested resource has been changed temporarily. New changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests.
   */
  MOVED_TEMPORARILY = "Moved Temporarily",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.2
   *
   * A Multi-Status response conveys information about multiple resources in situations where multiple status codes might be appropriate.
   */
  MULTI_STATUS = "Multi-Status",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.1
   *
   * The request has more than one possible responses. User-agent or user should choose one of them. There is no standardized way to choose one of the responses.
   */
  MULTIPLE_CHOICES = "Multiple Choices",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-6
   *
   * The 511 status code indicates that the client needs to authenticate to gain network access.
   */
  NETWORK_AUTHENTICATION_REQUIRED = "Network Authentication Required",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.5
   *
   * There is no content to send for this request, but the headers may be useful. The user-agent may update its cached headers for this resource with the new ones.
   */
  NO_CONTENT = "No Content",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.4
   *
   * This response code means returned meta-information set is not exact set as available from the origin server, but collected from a local or a third party copy. Except this condition, 200 OK response should be preferred instead of this response.
   */
  NON_AUTHORITATIVE_INFORMATION = "Non Authoritative Information",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.6
   *
   * This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content following the criteria given by the user agent.
   */
  NOT_ACCEPTABLE = "Not Acceptable",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.4
   *
   * The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurrence on the web.
   */
  NOT_FOUND = "Not Found",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.2
   *
   * The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.
   */
  NOT_IMPLEMENTED = "Not Implemented",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7232#section-4.1
   *
   * This is used for caching purposes. It is telling to client that response has not been modified. So, client can continue to use same cached version of response.
   */
  NOT_MODIFIED = "Not Modified",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.1
   *
   * The request has succeeded. The meaning of a success varies depending on the HTTP method:
   * GET: The resource has been fetched and is transmitted in the message body.
   * HEAD: The entity headers are in the message body.
   * POST: The resource describing the result of the action is transmitted in the message body.
   * TRACE: The message body contains the request message as received by the server.
   */
  OK = "OK",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7233#section-4.1
   *
   * This response code is used because of range header sent by the client to separate download into multiple streams.
   */
  PARTIAL_CONTENT = "Partial Content",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.2
   *
   * This response code is reserved for future use. Initial aim for creating this code was using it for digital payment systems however this is not used currently.
   */
  PAYMENT_REQUIRED = "Payment Required",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7538#section-3
   *
   * This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.
   */
  PERMANENT_REDIRECT = "Permanent Redirect",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7232#section-4.2
   *
   * The client has indicated preconditions in its headers which the server does not meet.
   */
  PRECONDITION_FAILED = "Precondition Failed",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-3
   *
   * The origin server requires the request to be conditional. Intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.
   */
  PRECONDITION_REQUIRED = "Precondition Required",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.1
   *
   * This code indicates that the server has received and is processing the request, but no response is available yet.
   */
  PROCESSING = "Processing",

  /**
   * Official Documentation @ https://www.rfc-editor.org/rfc/rfc8297#page-3
   *
   * This code indicates to the client that the server is likely to send a final response with the header fields included in the informational response.
   */
  EARLY_HINTS = "Early Hints",

  /**
   * Official Documentation @ https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.15
   *
   * The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.
   */
  UPGRADE_REQUIRED = "Upgrade Required",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7235#section-3.2
   *
   * This is similar to 401 but authentication is needed to be done by a proxy.
   */
  PROXY_AUTHENTICATION_REQUIRED = "Proxy Authentication Required",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.14
   *
   * This status code is sent when the server is refusing to process the request because one or more header fields are too large.
   */
  REQUEST_HEADER_FIELDS_TOO_LARGE = "Request Header Fields Too Large",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.1
   *
   * The server timed out waiting for the request.
   */
  REQUEST_TIMEOUT = "Request Timeout",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.2
   *
   * The request is larger than the server is willing or able to process.
   */
  REQUEST_TOO_LONG = "Request Entity Too Large",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.11
   *
   * The URI provided was too long for the server to process.
   */
  REQUEST_URI_TOO_LONG = "Request-URI Too Long",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7233#section-4.4
   *
   * The server cannot supply the requested range. This can be caused if the range is outside the bounds of the document.
   */
  REQUESTED_RANGE_NOT_SATISFIABLE = "Requested Range Not Satisfiable",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7233#section-4.3
   *
   * The client has asked for a portion of the file, but the server cannot supply that portion.
   */
  RESET_CONTENT = "Reset Content",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.4
   *
   * The response to the request can be found under another URI using a GET method.
   */
  SEE_OTHER = "See Other",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.1
   *
   * The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.
   */
  SERVICE_UNAVAILABLE = "Service Unavailable",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.2.2
   *
   * The server is switching protocols.
   */
  SWITCHING_PROTOCOLS = "Switching Protocols",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.7
   *
   * The requested resource has been temporarily moved to a different URI.
   */
  TEMPORARY_REDIRECT = "Temporary Redirect",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-4
   *
   * The user has sent too many requests in a given amount of time ("rate limiting").
   */
  TOO_MANY_REQUEHSTS = "Too Many Requests",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7235#section-3.1
   *
   * Authentication is required and has failed or has not yet been provided.
   */
  UNAUTHORIZED = "Unauthorized",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7725#section-4.1
   *
   * The resource is unavailable for legal reasons.
   */
  UNAVAILABLE_FOR_LEGAL_REASONS = "Unavailable For Legal Reasons",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc4918#section-11.2
   *
   * The request was well-formed but was unable to be followed due to semantic errors.
   */
  UNPROCESSABLE_ENTITY = "Unprocessable Entity",

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.13
   *
   * The server is refusing to process the request because the resource format is not supported.
   */
  UNSUPPORTED_MEDIA_TYPE = "Unsupported Media Type",

  /**
   * @deprecated
   * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.15
   *
   * The 506 status code indicates that the server is unwilling to do anything with the request.
   */
  USE_PROXY = "Use Proxy", // Deprecated

  /**
   * Official Documentation @ https://tools.ietf.org/html/rfc7540#section-9.1.1
   *
   * The server is unable to process the request because it was sent to a different server.
   */
  MISDIRECTED_REQUEST = "Misdirected Request",
}

export default HttpStatusPhrases;
