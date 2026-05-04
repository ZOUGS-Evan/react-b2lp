"use client";

import { useEffect, useState } from "react";

type Comment = {
  id: string;
  text: string;
  date: string;
};

export default function Post({ id }: { id: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");

  // LOAD
  useEffect(() => {
    const stored = localStorage.getItem(`comments-${id}`);
    if (stored) setComments(JSON.parse(stored));
  }, [id]);

  // SAVE
  const save = (data: Comment[]) => {
    setComments(data);
    localStorage.setItem(`comments-${id}`, JSON.stringify(data));
  };

  // ADD
  const addComment = () => {
    if (!text.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      text,
      date: new Date().toLocaleString(),
    };

    save([newComment, ...comments]);
    setText("");
  };

  return (
    <div className="mt-10">

      <h2 className="text-xl font-semibold text-purple-700 mb-4">
        Commentaires
      </h2>

      {/* INPUT */}
      <div className="flex gap-2 mb-6">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Écrire un commentaire..."
          className="flex-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
        />

        <button
          onClick={addComment}
          className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
        >
          Envoyer
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-400">
            Aucun commentaire
          </p>
        ) : (
          comments.map((c) => (
            <div
              key={c.id}
              className="bg-gray-50 border rounded-xl p-3"
            >
              <p className="text-sm">{c.text}</p>
              <span className="text-xs text-gray-400">
                {c.date}
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}