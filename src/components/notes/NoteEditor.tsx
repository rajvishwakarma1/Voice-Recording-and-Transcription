import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered } from 'lucide-react';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('bold') ? 'bg-gray-100 dark:bg-gray-700' : ''
        }`}
      >
        <Bold className="h-4 w-4 dark:text-gray-400" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('italic') ? 'bg-gray-100 dark:bg-gray-700' : ''
        }`}
      >
        <Italic className="h-4 w-4 dark:text-gray-400" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('bulletList') ? 'bg-gray-100 dark:bg-gray-700' : ''
        }`}
      >
        <List className="h-4 w-4 dark:text-gray-400" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('orderedList') ? 'bg-gray-100 dark:bg-gray-700' : ''
        }`}
      >
        <ListOrdered className="h-4 w-4 dark:text-gray-400" />
      </button>
    </div>
  );
};

export function NoteEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start typing your note...',
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none dark:prose-invert',
      },
    },
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <input
        type="text"
        placeholder="Note title"
        className="w-full text-2xl font-bold mb-4 border-none focus:outline-none focus:ring-0 bg-transparent dark:text-white"
      />
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="min-h-[300px]" />
    </div>
  );
}