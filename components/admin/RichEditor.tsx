'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold, Italic, List, ListOrdered,
  Image as ImageIcon, Heading2, Heading3,
  Quote, Undo, Redo,
} from 'lucide-react';

interface Props {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichEditor({ content, onChange, placeholder }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({ placeholder: placeholder ?? 'Start writing...' }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  const btnStyle = (active: boolean): React.CSSProperties => ({
    background: active ? 'rgba(233,206,139,0.15)' : 'transparent',
    border: 'none', borderRadius: '4px',
    color: active ? '#e9ce8b' : 'rgba(255,255,255,0.5)',
    cursor: 'pointer', padding: '0.35rem',
    display: 'flex', alignItems: 'center',
    transition: 'all 0.15s',
  });

  const addImage = () => {
    const url = prompt('Image URL:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div style={{
      border: '1px solid rgba(233,206,139,0.15)',
      borderRadius: '6px', overflow: 'hidden',
      background: '#0d1e24',
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '0.15rem',
        padding: '0.5rem 0.75rem',
        borderBottom: '1px solid rgba(233,206,139,0.1)',
        background: '#162830',
      }}>
        <button onClick={() => editor.chain().focus().toggleBold().run()}
          style={btnStyle(editor.isActive('bold'))} title="Bold">
          <Bold size={14} />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}
          style={btnStyle(editor.isActive('italic'))} title="Italic">
          <Italic size={14} />
        </button>

        <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 0.25rem' }} />

        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          style={btnStyle(editor.isActive('heading', { level: 2 }))} title="Heading 2">
          <Heading2 size={14} />
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          style={btnStyle(editor.isActive('heading', { level: 3 }))} title="Heading 3">
          <Heading3 size={14} />
        </button>

        <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 0.25rem' }} />

        <button onClick={() => editor.chain().focus().toggleBulletList().run()}
          style={btnStyle(editor.isActive('bulletList'))} title="Bullet list">
          <List size={14} />
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}
          style={btnStyle(editor.isActive('orderedList'))} title="Ordered list">
          <ListOrdered size={14} />
        </button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()}
          style={btnStyle(editor.isActive('blockquote'))} title="Blockquote">
          <Quote size={14} />
        </button>

        <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 0.25rem' }} />

        <button onClick={addImage} style={btnStyle(false)} title="Add image">
          <ImageIcon size={14} />
        </button>

        <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 0.25rem' }} />

        <button onClick={() => editor.chain().focus().undo().run()}
          style={btnStyle(false)} title="Undo">
          <Undo size={14} />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}
          style={btnStyle(false)} title="Redo">
          <Redo size={14} />
        </button>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} style={{ minHeight: '280px', padding: '1rem' }} />

      <style>{`
        .ProseMirror {
          outline: none;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.8);
          line-height: 1.8;
          min-height: 260px;
        }
        .ProseMirror h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; color: white;
          margin: 1.25rem 0 0.5rem;
        }
        .ProseMirror h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; color: white;
          margin: 1rem 0 0.4rem;
        }
        .ProseMirror p  { margin-bottom: 0.85rem; }
        .ProseMirror ul, .ProseMirror ol {
          padding-left: 1.5rem;
          margin-bottom: 0.85rem;
        }
        .ProseMirror blockquote {
          border-left: 2px solid #e9ce8b;
          padding-left: 1rem;
          color: rgba(255,255,255,0.55);
          font-style: italic;
          margin: 1rem 0;
        }
        .ProseMirror a { color: #e9ce8b; }
        .ProseMirror img {
          max-width: 100%;
          border-radius: 4px;
          margin: 0.5rem 0;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: rgba(255,255,255,0.2);
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}