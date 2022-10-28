// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json([
    {
      name: "HE Grenade",
      price: "300",
      side: "BOTH",
      reward: "300",
      selected: false,
    },
    {
      name: "Molotov",
      price: "400",
      side: "TR",
      reward: "300",
      selected: false,
    },
    {
      name: "Incendiary Grenade",
      price: "400",
      side: "CT",
      reward: "300",
      selected: false,
    },
    {
      name: "Flashbang",
      price: "200",
      side: "BOTH",
      reward: "300",
      selected: false,
    },
    {
      name: "Second Flashbang",
      price: "200",
      side: "BOTH",
      reward: "300",
      selected: false,
    },
    {
      name: "Smoke Grenade",
      price: "300",
      side: "BOTH",
      reward: "300",
      selected: false,
    },
  ]);
}
