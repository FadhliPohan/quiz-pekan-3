export default async function handler(req, res) {
  try {
    const response = await (
      await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes")
    ).json();
    res.status(200).json({ ...response });
  } catch (error) {
    console.log(error);
  }
}
