import React from 'react';
import { Brain, Zap, FileText, Users, Shield, BarChart3, Palette, Globe, Code, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

const FeaturesPage: React.FC = () => {
  const mainFeatures = [
    {
      icon: <Brain className="w-12 h-12 text-blue-600" />,
      title: 'Advanced AI Models',
      description: 'Powered by state-of-the-art language models that understand context, tone, and style to produce human-like content.',
      highlights: ['GPT-4 powered', 'Context-aware writing', 'Multiple language support', 'Continuous learning']
    },
    {
      icon: <Zap className="w-12 h-12 text-emerald-500" />,
      title: 'Lightning Fast Generation',
      description: 'Generate high-quality content in seconds with our optimized AI infrastructure and intelligent caching.',
      highlights: ['Sub-second response', 'Batch processing', 'Real-time collaboration', 'Auto-save functionality']
    },
    {
      icon: <FileText className="w-12 h-12 text-purple-600" />,
      title: 'Multiple Content Types',
      description: 'Create diverse content from blog posts to technical documentation with specialized templates and formatting.',
      highlights: ['50+ templates', 'Custom formats', 'Export options', 'Style presets']
    },
    {
      icon: <Users className="w-12 h-12 text-orange-500" />,
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time editing, comments, suggestions, and version control.',
      highlights: ['Real-time editing', 'Comment system', 'Version history', 'Role-based permissions']
    },
    {
      icon: <Shield className="w-12 h-12 text-red-500" />,
      title: 'Enterprise Security',
      description: 'Bank-level security with encryption, compliance certifications, and privacy-first architecture.',
      highlights: ['End-to-end encryption', 'GDPR compliant', 'SOC 2 certified', 'Data residency options']
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-indigo-600" />,
      title: 'Analytics & Insights',
      description: 'Track your writing performance, productivity metrics, and content effectiveness with detailed analytics.',
      highlights: ['Writing analytics', 'Performance metrics', 'Usage insights', 'Custom reports']
    }
  ];

  const aiCapabilities = [
    {
      icon: <Palette className="w-8 h-8 text-pink-500" />,
      title: 'Style Adaptation',
      description: 'Automatically adapt writing style to match your brand voice or personal preferences'
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      title: 'Multi-language Support',
      description: 'Write and translate content in over 50 languages with native-level fluency'
    },
    {
      icon: <Code className="w-8 h-8 text-green-500" />,
      title: 'Code Generation',
      description: 'Generate code snippets, documentation, and technical content with programming context'
    },
    {
      icon: <Sparkles className="w-8 h-8 text-yellow-500" />,
      title: 'Creative Writing',
      description: 'Craft stories, poems, scripts, and creative content with artistic flair'
    }
  ];

  const writingTools = [
    'Grammar & Style Checker',
    'Plagiarism Detection',
    'SEO Optimization',
    'Readability Analysis',
    'Tone Adjustment',
    'Citation Generator',
    'Outline Creator',
    'Research Assistant',
    'Fact Checking',
    'Content Summarizer',
    'Keyword Analysis',
    'Competitor Analysis'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              Powerful Features
            </span>
            <br />
            <span className="text-gray-900">for Every Writer</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Discover the comprehensive suite of AI-powered tools designed to elevate your writing 
            and streamline your content creation process.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {mainFeatures.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {feature.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Advanced AI Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI doesn't just write - it understands context, adapts to your style, 
              and continuously learns to deliver better results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aiCapabilities.map((capability, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 text-center group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {capability.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{capability.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Writing Tools */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Complete Writing Toolkit
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Everything you need to create, edit, and optimize your content in one powerful platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {writingTools.map((tool, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                  <span className="text-white font-medium">{tool}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with your favorite tools and platforms to streamline your workflow.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">API Access</h3>
              <p className="text-gray-600 mb-6">Integrate AI writing capabilities directly into your applications with our robust API.</p>
              <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center justify-center space-x-2">
                <span>View Documentation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-gray-50 to-emerald-50 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">CMS Integration</h3>
              <p className="text-gray-600 mb-6">Connect with WordPress, Shopify, and other content management systems.</p>
              <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors flex items-center justify-center space-x-2">
                <span>See Integrations</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Browser Extension</h3>
              <p className="text-gray-600 mb-6">Write with AI assistance anywhere on the web with our browser extension.</p>
              <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors flex items-center justify-center space-x-2">
                <span>Download Extension</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience the Future of Writing?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of writers who have already transformed their content creation process with AI Manus Pro.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-lg font-semibold rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-xl">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-transparent text-white text-lg font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;