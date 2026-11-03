/** Redaktionel tekst til velkomstsektionen (bruges af begge varianter). */
export const welcome = {
  label: "Velkommen",
  heading: ["Her er der altid plads", "til lidt mere tid."],
  body: [
    "Mad & Mennesker er et nyt spisested på Slotspladsen. Et sted, hvor man kommer for maden — og bliver for stemningen.",
    "Klassisk dansk mad af gode råvarer, serveret uden dikkedarer. Lange frokoster, gode middage og en lille bar til dem, der ikke vil hjem endnu.",
  ],
  chapters: [
    {
      kicker: "Maden",
      title: "Dansk, som den skal smage",
      text: "Et kort, der er til at overskue, med retter, man holder af. Vi laver få ting — og laver dem ordentligt.",
      photo: "dining" as const,
      icon: "fork-knife" as const,
    },
    {
      kicker: "Menneskerne",
      title: "Personlig betjening",
      text: "Her bliver du budt velkommen, ikke ekspederet. Vi vil gerne kende dig næste gang, du kommer.",
      photo: "private-corner" as const,
      icon: "people" as const,
    },
    {
      kicker: "Tiden",
      title: "Bliv siddende lidt endnu",
      text: "En kop kaffe mere. En dessert til deling. Et sidste glas i baren. Ingen har travlt hos os.",
      photo: "bar" as const,
      icon: "candle" as const,
    },
  ],
};
