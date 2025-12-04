export async function GET() {
  // Real delay to make streaming visible
  await new Promise((r) => setTimeout(r, 5000));

  return Response.json({
    message: "Dynamic API response",
    time: new Date().toISOString(),
  });
}
