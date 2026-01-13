import { useSelector, useDispatch } from "react-redux";
import {
  selectTwits,
  likeTwit,
  unlikeTwit,
  deleteTwit,
  replyToTwit,
} from "../twitsSlice.js";

export default function Feed() {
  const dispatch = useDispatch();
  const twits = useSelector(selectTwits("normal")); // normal sıralama

  return (
    <div className="space-y-4">
      {twits.map((twit) => (
        <div
          key={twit.id}
          className="border p-4 rounded bg-white shadow"
        >
          <h3 className="text-lg font-semibold">{twit.username}</h3>
          <p className="text-gray-700">{twit.content}</p>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => dispatch(likeTwit({ id: twit.id }))}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              👍 Beğen ({twit.likes})
            </button>
            <button
              onClick={() => dispatch(unlikeTwit({ id: twit.id }))}
              className="bg-yellow-600 text-white px-3 py-1 rounded"
            >
              👎 Unlike
            </button>
            <button
              onClick={() => dispatch(deleteTwit(twit.id))}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              🗑️ Sil
            </button>
            <button
              onClick={() =>
                dispatch(
                  replyToTwit({
                    replyTo: twit.id,
                    reply: "Bu bir örnek cevap",
                  })
                )
              }
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              💬 Cevap
            </button>
          </div>

          {/* Eğer replies varsa göster */}
          {twit.replies && twit.replies.length > 0 && (
            <div className="mt-3 pl-4 border-l">
              <h4 className="font-medium">Yanıtlar:</h4>
              {twit.replies.map((r, i) => (
                <p key={i} className="text-gray-600 text-sm">
                  {r}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
