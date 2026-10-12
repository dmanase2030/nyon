"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createPost } from "@/lib/actions/posts";
import { Alert, Button } from "@/components/ui";

export function Composer() {
  const [state, action, pending] = useActionState(createPost, undefined);
  const [text, setText] = useState("");
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message === "posted") {
      setText("");
      ref.current?.reset();
    }
  }, [state]);

  return (
    <form ref={ref} action={action} className="border-b border-border px-4 py-3 md:px-6">
      <label htmlFor="body" className="sr-only">
        New post
      </label>
      <textarea
        id="body"
        name="body"
        rows={2}
        maxLength={1000}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What are you watching?"
        className="w-full resize-none bg-transparent text-sm placeholder:text-muted focus:outline-none"
      />
      {state?.error ? <Alert>{state.error}</Alert> : null}
      <div className="mt-2 flex items-center justify-end gap-3">
        <span className="font-mono text-xs text-muted">{text.length}/1000</span>
        <Button size="sm" type="submit" disabled={pending || !text.trim()}>
          {pending ? "Posting…" : "Post"}
        </Button>
      </div>
    </form>
  );
}
