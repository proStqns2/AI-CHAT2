import React from 'react';
import { Check, Star, Zap, Crown, Rocket } from 'lucide-react';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      icon: <Star className="w-8 h-8 text-blue-600" />,
      price: 'Free',
      period: 'forever',
      description: 'Perfect for getting started with AI writing',
      features: [
        '5,000 words per month',
        'Basic AI writing assistance',
        '3 document templates',
        'Standard support',
        'Basic grammar checking',
        'Email support'
      ],
      buttonText: 'Get Started Free',
      buttonStyle: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      popular: false
    },
    {
      name: 'Professional',
      icon: <Zap className="w-8 h-8 text-purple-600" />,
      price: '$19',
      period: 'per month',
      description: 'Ideal for content creators and professionals',
      features: [
        '50,000 words per month',
        'Advanced AI writing assistance',
        '15+ document templates',
        'Priority support',
        'Advanced grammar & style checking',
        'Plagiarism detection',
        'Team collaboration (up to 3 members)',
        'Export to multiple formats',
        'Custom writing styles'
      ],
      buttonText: 'Start Free Trial',
      buttonStyle: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700',
      popular: true
    },
    {
      name: 'Enterprise',
      icon: <Crown className="w-8 h-8 text-emerald-600" />,
      price: '$49',
      period: 'per month',
      description: 'For teams and organizations with advanced needs',
      features: [
        'Unlimited words',
        'Premium AI models',
        'Unlimited templates',
        '24/7 dedicated support',
        'Advanced analytics',
        'Custom AI training',
        'Unlimited team members',
        'API access',
        'Custom integrations',
        'Advanced security features',
        'White-label options'
      ],
      buttonText: 'Contact Sales',
      buttonStyle: 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white hover:from-emerald-700 hover:to-blue-700',
      popular: false
    }
  ];

  const features = [
    {
      icon: <Rocket className="w-6 h-6 text-blue-600" />,
      title: 'Lightning Fast',
      description: 'Generate content in seconds with our optimized AI infrastructure'
    },
    {
      icon: <Check className="w-6 h-6 text-emerald-600" />,
      title: '99.9% Uptime',
      description: 'Reliable service you can count on for critical writing deadlines'
    },
    {
      icon: <Star className="w-6 h-6 text-purple-600" />,
      title: 'Premium Quality',
      description: 'Industry-leading AI models for the highest quality output'
    }
  ];

  const faqs = [
    {
      question: 'Can I switch plans at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we\'ll prorate any differences.'
    },
    {
      question: 'What happens if I exceed my word limit?',
      answer: 'If you exceed your monthly word limit, you can either upgrade your plan or purchase additional words. We\'ll notify you before you reach your limit.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, we\'ll provide a full refund.'
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access to your plan features until the end of your billing period.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-20">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Choose the perfect plan for your writing needs. Start free, upgrade when you're ready.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                {feature.icon}
                <span className="text-gray-700 font-medium">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  plan.popular 
                    ? 'border-purple-200 ring-4 ring-purple-100' 
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    {plan.icon}
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl md:text-5xl font-bold text-gray-900">{plan.price}</span>
                      {plan.price !== 'Free' && (
                        <span className="text-gray-500 text-lg">/{plan.period}</span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                  </div>
                  
                  <button className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg mb-8 ${plan.buttonStyle}`}>
                    {plan.buttonText}
                  </button>
                  
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            We work with large organizations to provide tailored AI writing solutions 
            that meet your specific requirements and compliance needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-xl">
              Schedule a Demo
            </button>
            <button className="px-8 py-4 bg-transparent text-white text-lg font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-200">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;