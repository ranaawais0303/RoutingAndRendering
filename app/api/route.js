export function GET(req) {
  console.log(req);

  //   return  Response.json();

  return new Response("Hello!");
}
