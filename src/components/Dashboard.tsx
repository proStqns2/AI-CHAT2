import React, { useState } from 'react';
import { Plus, FileText, Search, Filter, Calendar, MoreVertical, Edit3, Trash2, Share2, Download } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  type: 'Article' | 'Essay' | 'Email' | 'Report' | 'Creative';
  wordCount: number;
  lastModified: Date;
  status: 'Draft' | 'In Progress' | 'Completed';
}

const Dashboard: React.FC = () => {
  const [documents] = useState<Document[]>([
    {
      id: '1',
      title: 'The Future of Artificial Intelligence in Healthcare',
      type: 'Article',
      wordCount: 2847,
      lastModified: new Date('2024-01-15'),
      status: 'Completed'
    },
    {
      id: '2',
      title: 'Marketing Strategy Q1 2024',
      type: 'Report',
      wordCount: 1523,
      lastModified: new Date('2024-01-14'),
      status: 'In Progress'
    },
    {
      id: '3',
      title: 'Client Proposal - Web Development Project',
      type: 'Email',
      wordCount: 456,
      lastModified: new Date('2024-01-13'),
      status: 'Draft'
    },
    {
      id: '4',
      title: 'The Art of Digital Storytelling',
      type: 'Creative',
      wordCount: 3241,
      lastModified: new Date('2024-01-12'),
      status: 'Completed'
    },
    {
      id: '5',
      title: 'Climate Change Impact Assessment',
      type: 'Essay',
      wordCount: 1876,
      lastModified: new Date('2024-01-11'),
      status: 'In Progress'
    },
    {
      id: '6',
      title: 'Product Launch Announcement',
      type: 'Email',
      wordCount: 623,
      lastModified: new Date('2024-01-10'),
      status: 'Draft'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const documentTypes = ['All', 'Article', 'Essay', 'Email', 'Report', 'Creative'];
  const statusOptions = ['All', 'Draft', 'In Progress', 'Completed'];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || doc.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || doc.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Article': return '📄';
      case 'Essay': return '📝';
      case 'Email': return '✉️';
      case 'Report': return '📊';
      case 'Creative': return '✨';
      default: return '📄';
    }
  };

  const stats = [
    { label: 'Total Documents', value: documents.length, color: 'from-blue-500 to-blue-600' },
    { label: 'Words Written', value: documents.reduce((sum, doc) => sum + doc.wordCount, 0).toLocaleString(), color: 'from-emerald-500 to-emerald-600' },
    { label: 'Completed', value: documents.filter(doc => doc.status === 'Completed').length, color: 'from-purple-500 to-purple-600' },
    { label: 'In Progress', value: documents.filter(doc => doc.status === 'In Progress').length, color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Writing Dashboard</h1>
          <p className="text-xl text-gray-600">Manage and organize all your AI-generated content</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <div className="w-6 h-6 bg-white/30 rounded-full"></div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {documentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>New Document</span>
            </button>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getTypeIcon(doc.type)}</span>
                  <div>
                    <span className="text-sm font-medium text-gray-500">{doc.type}</span>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ml-2 ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {doc.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{doc.wordCount.toLocaleString()} words</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{doc.lastModified.toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Share">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors" title="Download">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No documents found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;