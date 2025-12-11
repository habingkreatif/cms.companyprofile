"use client";

import { OrgNode } from "@/domain/entities/aboutUs";
import { Plus, Trash2, Edit2, ChevronDown, ChevronRight, User } from "lucide-react";
import { useState } from "react";

interface OrgTreeProps {
  data: OrgNode[];
  isEditing: boolean;
  onChange: (data: OrgNode[]) => void;
}

export const OrgTree = ({ data, isEditing, onChange }: OrgTreeProps) => {
  const createNewNode = (): OrgNode => ({
    id: Math.random().toString(36).substr(2, 9),
    name: "New Position",
    position: "Title",
    photo: "",
    children: []
  });

  const updateNode = (nodes: OrgNode[], nodeId: string, updates: Partial<OrgNode>): OrgNode[] => {
    return nodes.map(node => {
      if (node.id === nodeId) {
        return { ...node, ...updates };
      }
      if (node.children) {
        return { ...node, children: updateNode(node.children, nodeId, updates) };
      }
      return node;
    });
  };

  const addNode = (nodes: OrgNode[], parentId: string): OrgNode[] => {
    return nodes.map(node => {
      if (node.id === parentId) {
        return { 
          ...node, 
          children: [...(node.children || []), createNewNode()] 
        };
      }
      if (node.children) {
        return { ...node, children: addNode(node.children, parentId) };
      }
      return node;
    });
  };

  const deleteNode = (nodes: OrgNode[], nodeId: string): OrgNode[] => {
    return nodes.filter(node => node.id !== nodeId).map(node => {
      if (node.children) {
        return { ...node, children: deleteNode(node.children, nodeId) };
      }
      return node;
    });
  };

  const handleUpdate = (nodeId: string, updates: Partial<OrgNode>) => {
    onChange(updateNode(data, nodeId, updates));
  };

  const handleAddChild = (parentId: string) => {
    onChange(addNode(data, parentId));
  };

  const handleDelete = (nodeId: string) => {
    if (confirm("Are you sure you want to delete this position and all its subordinates?")) {
      onChange(deleteNode(data, nodeId));
    }
  };

  const handleAddRoot = () => {
    onChange([...data, createNewNode()]);
  };

  const TreeNode = ({ node }: { node: OrgNode }) => {
    return (
      <div className="flex flex-col items-center">
        <div className="relative group">
          <div className={`
            min-w-[200px] bg-white rounded-lg shadow-sm border 
            ${isEditing ? 'border-blue-200 hover:border-blue-400' : 'border-gray-200'} 
            p-4 text-center transition-all duration-200 relative z-10
          `}>
            {isEditing ? (
              <div className="space-y-2">
                {/* Photo Preview/Input */}
                <div className="flex flex-col items-center mb-2">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 mb-2 flex items-center justify-center">
                    {node.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={node.photo} 
                        alt={node.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://via.placeholder.com/64?text=No+Photo";
                        }}
                      />
                    ) : (
                      <User className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <input
                    type="url"
                    value={node.photo || ""}
                    onChange={(e) => handleUpdate(node.id, { photo: e.target.value })}
                    className="w-full text-center text-xs text-gray-600 border-b border-transparent hover:border-blue-200 focus:border-blue-500 outline-none bg-transparent px-1"
                    placeholder="Photo URL"
                  />
                </div>
                
                <input
                  type="text"
                  value={node.name}
                  onChange={(e) => handleUpdate(node.id, { name: e.target.value })}
                  className="w-full text-center text-sm font-semibold text-gray-900 border-b border-transparent hover:border-blue-200 focus:border-blue-500 outline-none bg-transparent"
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={node.position}
                  onChange={(e) => handleUpdate(node.id, { position: e.target.value })}
                  className="w-full text-center text-xs text-blue-600 border-b border-transparent hover:border-blue-200 focus:border-blue-500 outline-none bg-transparent"
                  placeholder="Position Title"
                />
                
                {/* Edit Actions Overlay */}
                <div className="absolute -right-3 -top-3 hidden group-hover:flex gap-1 z-20">
                   <button 
                     type="button"
                     onClick={() => handleDelete(node.id)}
                     className="p-1.5 bg-red-100 text-red-600 rounded-full shadow-sm hover:bg-red-200 transition-colors"
                     title="Delete Node"
                   >
                     <Trash2 className="w-3 h-3" />
                   </button>
                   <button 
                     type="button"
                     onClick={() => handleAddChild(node.id)}
                     className="p-1.5 bg-blue-100 text-blue-600 rounded-full shadow-sm hover:bg-blue-200 transition-colors"
                     title="Add Subordinate"
                   >
                     <Plus className="w-3 h-3" />
                   </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 mx-auto mb-2 flex items-center justify-center">
                  {node.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={node.photo} 
                      alt={node.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/64?text=No+Photo";
                      }}
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{node.name}</h3>
                <p className="text-xs text-blue-600 font-medium mt-0.5">{node.position}</p>
              </div>
            )}
          </div>
          
          {/* Vertical line connector from node to children container */}
          {node.children && node.children.length > 0 && (
            <div className="w-px h-8 bg-gray-300 mx-auto"></div>
          )}
        </div>

        {/* Children container */}
        {node.children && node.children.length > 0 && (
          <div className="relative flex pt-4 px-2">
            {/* Horizontal connecting line */}
            {node.children.length > 1 && (
              <div className="absolute top-0 left-[50%] -translate-x-1/2 w-[calc(100%-200px-2rem)] h-px bg-gray-300"></div>
            )}
            
            {/* Render children horizontally */}
            <div className="flex gap-8">
              {node.children.map((child, index) => (
                 <div key={child.id} className="relative d-flex flex-col items-center">
                    {/* Vertical line from horizontal bar to child node */}
                    <div className="w-px h-4 bg-gray-300 mx-auto absolute -top-4 left-1/2"></div>
                    <TreeNode node={child} />
                 </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!data || data.length === 0) {
    if (isEditing) {
      return (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
           <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
             <User className="w-8 h-8 text-blue-500" />
           </div>
           <h3 className="text-lg font-medium text-gray-900 mb-1">Start Organization Chart</h3>
           <p className="text-sm text-gray-500 mb-6">Create your structure starting with a top-level position.</p>
           <button
             type="button"
             onClick={handleAddRoot}
             className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md active:scale-95"
           >
             <Plus className="w-4 h-4" />
             Create Root Node
           </button>
        </div>
      );
    }
    return (
       <div className="text-center py-12 text-gray-500 italic bg-gray-50 rounded-xl">
         No organization structure available.
       </div>
    );
  }

  return (
    <div className="overflow-x-auto pb-8 pt-4 custom-scrollbar">
       <div className="min-w-max flex justify-center p-4">
         <div className="flex gap-12">
            {data.map(rootNode => (
               <TreeNode key={rootNode.id} node={rootNode} />
            ))}
         </div>
       </div>
    </div>
  );
};
