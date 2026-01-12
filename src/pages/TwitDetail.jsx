import { useParams } from "react-router-dom";

export default function TwitDetail() {
  const { twitId } = useParams();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Twit Detay</h2>
      <p>Twit ID: {twitId}</p>
      {/* Burada twit içeriği, like sayısı, tarih ve reply listesi gösterilecek */}
    </div>
  );
}
