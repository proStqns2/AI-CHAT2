import React from 'react';
import { ArrowRight, Zap, Brain, FileText, Users, Star, CheckCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: 'Advanced AI Writing',
      description: 'Powered by cutting-edge language models for superior content generation and editing assistance.'
    },
    {
      icon: <Zap className="w-8 h-8 text-emerald-500" />,
      title: 'Lightning Fast',
      description: 'Generate high-quality content in seconds with our optimized AI processing pipeline.'
    },
    {
      icon: <FileText className="w-8 h-8 text-purple-600" />,
      title: 'Multiple Formats',
      description: 'Support for articles, essays, emails, reports, and creative content in various styles.'
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: 'Collaboration',
      description: 'Share and collaborate on documents with team members in real-time.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Content Marketing Manager',
      content: 'AI Manus Pro has revolutionized our content creation process. We\'re producing 3x more high-quality content.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Academic Researcher',
      content: 'The research assistance and citation features are incredible. It\'s like having a research assistant 24/7.',
      rating: 5
    },
    {
      name: 'Emma Thompson',
      role: 'Freelance Writer',
      content: 'This tool has significantly improved my writing speed and quality. My clients love the results.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-8">
              <Zap className="w-4 h-4 mr-2" />
              Powered by Advanced AI Technology
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              Write Smarter
            </span>
            <br />
            <span className="text-gray-900">Not Harder</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform your writing with AI-powered assistance. Create compelling content, 
            research papers, and creative works with unprecedented speed and quality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl group">
              Start Writing for Free
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/80 backdrop-blur-lg text-gray-900 text-lg font-semibold rounded-xl hover:bg-white transition-all duration-300 shadow-lg border border-gray-200">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Every Writer</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the tools that will elevate your writing to new heights
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">500K+</div>
              <div className="text-blue-100 text-lg">Documents Created</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-blue-100 text-lg">Happy Writers</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100 text-lg">Uptime</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-100 text-lg">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Loved by Writers Worldwide
            </h2>
            <p className="text-xl text-gray-600">See what our users are saying about AI Manus Pro</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Writing?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of writers who have already discovered the power of AI-assisted writing
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-lg font-semibold rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-xl">
              Start Your Free Trial
            </button>
            <div className="flex items-center text-gray-300">
              <CheckCircle className="w-5 h-5 mr-2 text-emerald-400" />
              No credit card required
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;