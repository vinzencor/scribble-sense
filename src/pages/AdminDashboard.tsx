import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  signOut,
  getServices,
  createService,
  updateService,
  deleteService,
  getResources,
  createResource,
  updateResource,
  deleteResource,
  getWorkbooks,
  createWorkbook,
  updateWorkbook,
  deleteWorkbook,
  getGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  uploadFile,
  Service,
  Resource,
  Workbook,
  GalleryImage,
} from "@/lib/supabase";
import {
  LayoutDashboard,
  Settings,
  Image,
  BookOpen,
  FileText,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Upload,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type TabType = "services" | "resources" | "workbooks" | "gallery";

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("services");
  const navigate = useNavigate();

  // Data states
  const [services, setServices] = useState<Service[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [workbooks, setWorkbooks] = useState<Workbook[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  // Form states
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, activeTab]);

  const checkAuth = async () => {
    // Check localStorage auth first
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth) {
      const { authenticated, email } = JSON.parse(adminAuth);
      if (authenticated) {
        setUser({ email });
        setLoading(false);
        return;
      }
    }
    // Fallback to Supabase auth
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      navigate("/admin");
      return;
    }
    setUser(currentUser);
    setLoading(false);
  };

  const loadData = async () => {
    switch (activeTab) {
      case "services":
        const { data: servicesData } = await getServices();
        setServices(servicesData || []);
        break;
      case "resources":
        const { data: resourcesData } = await getResources();
        setResources(resourcesData || []);
        break;
      case "workbooks":
        const { data: workbooksData } = await getWorkbooks();
        setWorkbooks(workbooksData || []);
        break;
      case "gallery":
        const { data: galleryData } = await getGalleryImages();
        setGalleryImages(galleryData || []);
        break;
    }
  };

  const handleLogout = async () => {
    // Clear localStorage auth
    localStorage.removeItem("adminAuth");
    // Also sign out from Supabase
    await signOut();
    navigate("/admin");
  };

  const handleFileUpload = async (file: File, bucket: string) => {
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await uploadFile(bucket, fileName, file);
    setUploading(false);
    if (error) {
      toast.error("Failed to upload file");
      return null;
    }
    return data?.publicUrl;
  };

  const handleSave = async () => {
    try {
      switch (activeTab) {
        case "services":
          if (editingItem) {
            await updateService(editingItem.id, formData);
            toast.success("Service updated successfully");
          } else {
            await createService({ ...formData, display_order: services.length + 1 });
            toast.success("Service created successfully");
          }
          break;
        case "resources":
          if (editingItem) {
            await updateResource(editingItem.id, formData);
            toast.success("Resource updated successfully");
          } else {
            await createResource({ ...formData, display_order: resources.length + 1 });
            toast.success("Resource created successfully");
          }
          break;
        case "workbooks":
          if (editingItem) {
            await updateWorkbook(editingItem.id, formData);
            toast.success("Workbook updated successfully");
          } else {
            await createWorkbook({ ...formData, display_order: workbooks.length + 1 });
            toast.success("Workbook created successfully");
          }
          break;
        case "gallery":
          if (editingItem) {
            await updateGalleryImage(editingItem.id, formData);
            toast.success("Image updated successfully");
          } else {
            await createGalleryImage({ ...formData, display_order: galleryImages.length + 1 });
            toast.success("Image added successfully");
          }
          break;
      }
      setEditingItem(null);
      setIsAdding(false);
      setFormData({});
      loadData();
    } catch (error) {
      toast.error("Failed to save");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      let result;
      switch (activeTab) {
        case "services":
          result = await deleteService(id);
          break;
        case "resources":
          result = await deleteResource(id);
          break;
        case "workbooks":
          result = await deleteWorkbook(id);
          break;
        case "gallery":
          result = await deleteGalleryImage(id);
          break;
      }
      
      if (result?.error) {
        console.error("Delete error:", result.error);
        toast.error(`Failed to delete: ${result.error.message}`);
        return;
      }
      
      toast.success("Deleted successfully");
      await loadData();
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(`Failed to delete: ${error.message || 'Unknown error'}`);
    }
  };

  const tabs = [
    { id: "services" as TabType, label: "Services", icon: Settings },
    { id: "resources" as TabType, label: "Resources", icon: FileText },
    { id: "workbooks" as TabType, label: "Workbooks", icon: BookOpen },
    { id: "gallery" as TabType, label: "Gallery", icon: Image },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#382467]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#382467] rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-800">ScribbleSense Admin</h1>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => {
                setActiveTab(tab.id);
                setEditingItem(null);
                setIsAdding(false);
              }}
              className={`gap-2 ${activeTab === tab.id ? "bg-[#382467] hover:bg-[#4a3080]" : ""}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 capitalize">{activeTab}</h2>
          <Button
            onClick={() => {
              setIsAdding(true);
              setEditingItem(null);
              setFormData({});
            }}
            className="bg-[#382467] hover:bg-[#4a3080] gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New
          </Button>
        </div>

        {/* Form Modal */}
        <AnimatePresence>
          {(isAdding || editingItem) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => {
                setIsAdding(false);
                setEditingItem(null);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">
                    {editingItem ? "Edit" : "Add"} {activeTab.slice(0, -1)}
                  </h3>
                  <Button variant="ghost" size="icon" onClick={() => { setIsAdding(false); setEditingItem(null); }}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                {renderForm()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );

  function renderForm() {
    switch (activeTab) {
      case "services":
        return (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={formData.title || editingItem?.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Service title"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description || editingItem?.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Service description"
                rows={4}
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                value={formData.image_url || editingItem?.image_url || ""}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
              />
              <p className="text-xs text-slate-500 mt-1">Or upload an image:</p>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = await handleFileUpload(file, "images");
                    if (url) setFormData({ ...formData, image_url: url });
                  }
                }}
                className="mt-2 text-sm"
              />
            </div>
            <Button onClick={handleSave} className="w-full bg-[#382467] hover:bg-[#4a3080]" disabled={uploading}>
              {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              Save Service
            </Button>
          </div>
        );
      case "resources":
        return (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={formData.title || editingItem?.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Resource title"
              />
            </div>
            <div>
              <Label>File URL</Label>
              <Input
                value={formData.file_url || editingItem?.file_url || ""}
                onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                placeholder="/downloads/file.pdf"
              />
              <p className="text-xs text-slate-500 mt-1">Or upload a file:</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = await handleFileUpload(file, "documents");
                    if (url) setFormData({ ...formData, file_url: url });
                  }
                }}
                className="mt-2 text-sm"
              />
            </div>
            <Button onClick={handleSave} className="w-full bg-[#382467] hover:bg-[#4a3080]" disabled={uploading}>
              {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              Save Resource
            </Button>
          </div>
        );
      case "workbooks":
        return (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={formData.title || editingItem?.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Workbook title"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description || editingItem?.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Workbook description"
                rows={3}
              />
            </div>
            <div>
              <Label>PDF URL</Label>
              <Input
                value={formData.pdf_url || editingItem?.pdf_url || ""}
                onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
                placeholder="/workbook.pdf"
              />
              <p className="text-xs text-slate-500 mt-1">Or upload PDF:</p>
              <input
                type="file"
                accept=".pdf"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = await handleFileUpload(file, "workbooks");
                    if (url) setFormData({ ...formData, pdf_url: url });
                  }
                }}
                className="mt-2 text-sm"
              />
            </div>
            <div>
              <Label>Cover Image URL</Label>
              <Input
                value={formData.cover_image_url || editingItem?.cover_image_url || ""}
                onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                placeholder="https://..."
              />
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = await handleFileUpload(file, "images");
                    if (url) setFormData({ ...formData, cover_image_url: url });
                  }
                }}
                className="mt-2 text-sm"
              />
            </div>
            <Button onClick={handleSave} className="w-full bg-[#382467] hover:bg-[#4a3080]" disabled={uploading}>
              {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              Save Workbook
            </Button>
          </div>
        );
      case "gallery":
        return (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={formData.title || editingItem?.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Image title"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={formData.description || editingItem?.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Image description"
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                value={formData.image_url || editingItem?.image_url || ""}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
              />
              <p className="text-xs text-slate-500 mt-1">Or upload an image:</p>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = await handleFileUpload(file, "gallery");
                    if (url) setFormData({ ...formData, image_url: url });
                  }
                }}
                className="mt-2 text-sm"
              />
            </div>
            <div>
              <Label>Grid Span (CSS classes)</Label>
              <Input
                value={formData.span || editingItem?.span || "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2"}
                onChange={(e) => setFormData({ ...formData, span: e.target.value })}
                placeholder="md:col-span-1 md:row-span-2"
              />
            </div>
            <Button onClick={handleSave} className="w-full bg-[#382467] hover:bg-[#4a3080]" disabled={uploading}>
              {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              Save Image
            </Button>
          </div>
        );
    }
  }

  function renderContent() {
    switch (activeTab) {
      case "services":
        return services.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No services yet. Add your first service!</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {services.map((service) => (
              <div key={service.id} className="p-4 flex items-center gap-4 hover:bg-slate-50">
                <img src={service.image_url} alt={service.title} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800">{service.title}</h4>
                  <p className="text-sm text-slate-500 line-clamp-1">{service.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => { setEditingItem(service); setFormData(service); }}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(service.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        );
      case "resources":
        return resources.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No resources yet. Add your first resource!</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {resources.map((resource) => (
              <div key={resource.id} className="p-4 flex items-center gap-4 hover:bg-slate-50">
                <FileText className="w-10 h-10 text-[#382467]" />
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800">{resource.title}</h4>
                  <p className="text-sm text-slate-500">{resource.file_url}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => { setEditingItem(resource); setFormData(resource); }}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(resource.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        );
      case "workbooks":
        return workbooks.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No workbooks yet. Add your first workbook!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {workbooks.map((workbook) => (
              <div key={workbook.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <img src={workbook.cover_image_url} alt={workbook.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold text-slate-800">{workbook.title}</h4>
                  <p className="text-sm text-slate-500 line-clamp-2">{workbook.description}</p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" onClick={() => { setEditingItem(workbook); setFormData(workbook); }}>
                      <Edit2 className="w-4 h-4 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(workbook.id)}>
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case "gallery":
        return galleryImages.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No images yet. Upload your first image!</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {galleryImages.map((image) => (
              <div key={image.id} className="relative group rounded-lg overflow-hidden border border-slate-200">
                <img src={image.image_url} alt={image.title} className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    onClick={(e) => { 
                      e.stopPropagation();
                      setEditingItem(image); 
                      setFormData(image); 
                    }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(image.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white text-xs truncate">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        );
    }
  }
};

export default AdminDashboard;

