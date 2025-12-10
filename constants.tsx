import React from 'react';
import { Package, RotateCcw, Brain, CreditCard, ExternalLink, CheckCircle, TrendingUp, Truck, Globe, Bell, ShieldCheck, Mail, ArrowRight, ShoppingBag, LayoutTemplate, Newspaper, Zap } from 'lucide-react';

// --- Shared Components ---

const Btn = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer" 
    className="inline-flex items-center gap-2 px-4 py-2 bg-[#D68C5D] border-2 border-[#432818] text-[#432818] font-bold uppercase text-xs font-mono-retro hover:bg-[#432818] hover:text-[#FAEDCD] shadow-[4px_4px_0px_0px_#432818] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#432818] transition-all rounded-md"
  >
    {children}
  </a>
);

const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <div className="flex items-center gap-2 border-b-2 border-[#432818] pb-2 mb-6 mt-4">
        <div className="bg-[#432818] text-[#FAEDCD] p-1 rotate-3 rounded-sm">
            <Icon size={18} />
        </div>
        <h2 className="text-2xl font-serif-retro italic text-[#432818]">{title}</h2>
    </div>
);

// --- Content Modules ---

export const CONTENT_TRACKING = (
  <div className="p-6 space-y-8 bg-[#FFF8F0]">
    {/* Hero Section */}
    <div className="flex flex-col md:flex-row gap-6 items-center bg-white border-2 border-[#432818] p-6 shadow-[6px_6px_0px_0px_#D6C4B0] rounded-lg">
        <div className="flex-1">
            <h1 className="text-4xl font-serif-retro italic mb-2 text-[#432818]">Tracking <span className="text-[#D68C5D]">XP</span></h1>
            <p className="font-mono-retro text-sm mb-4 text-[#432818]/80">Stop the "Where is my order?" madness.</p>
            <Btn href="https://www.aftership.com/tracking?as_source=www.aftership.com%2F&as_source_cta=top-nav-Tracking">
                Initiate Sequence <ArrowRight size={14} />
            </Btn>
        </div>
        {/* CSS Art: Package Radar */}
        <div className="w-32 h-32 bg-[#432818] relative overflow-hidden border-2 border-[#D68C5D] rounded-full">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(0deg, #D68C5D 1px, transparent 1px), linear-gradient(90deg, #D68C5D 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-[#D68C5D] rounded-full animate-ping"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-[#FAEDCD] font-mono-retro mt-4">SCANNING...</div>
        </div>
    </div>

    {/* Meme Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-2 border-[#432818] bg-[#f2e8cf] p-2 rounded-md">
            <div className="bg-[#432818] text-[#FAEDCD] px-2 py-1 font-bold text-xs flex justify-between rounded-t-sm">
                <span>Error 404: Package Found</span>
                <span>X</span>
            </div>
            <div className="p-4 flex flex-col items-center text-center">
                <Truck size={32} className="mb-2 text-[#606c38] animate-bounce" />
                <p className="font-bold text-sm text-[#432818]">Customer Status:</p>
                <p className="text-xs italic text-[#432818]/70">"Refreshing tracking page every 5 seconds..."</p>
                <div className="w-full bg-[#FAEDCD] h-4 mt-2 border border-[#432818] relative rounded-full overflow-hidden">
                    <div className="h-full bg-[#bc4749] w-[99%] absolute top-0 left-0"></div>
                </div>
                <p className="text-[10px] mt-1 text-[#432818]">99% Delivered (Stuck in Customs?)</p>
            </div>
        </div>
        
        <div className="border-2 border-[#432818] p-4 bg-white flex flex-col justify-center rounded-md">
            <h3 className="font-bold flex items-center gap-2 mb-2 uppercase text-sm text-[#432818]">
                <ShieldCheck size={16} /> Solution
            </h3>
            <p className="text-xs text-[#432818]/80 mb-2">Don't let packages enter the Bermuda Triangle of logistics without notification.</p>
            <ul className="text-xs list-disc pl-4 space-y-1 font-mono-retro text-[#432818]">
                <li>Automated updates via SMS</li>
                <li>Branded tracking pages</li>
                <li>Predictive delivery dates</li>
            </ul>
        </div>
    </div>
  </div>
);

export const CONTENT_RETURNS = (
  <div className="p-6 space-y-6 bg-[#FFF8F0]">
    <SectionHeader title="Returns Center 2000" icon={RotateCcw} />

    {/* Interactive Mockup */}
    <div className="border-2 border-[#432818] bg-white p-4 relative rounded-md">
        <div className="absolute -top-3 -right-3 bg-[#bc4749] text-white text-xs font-bold px-2 py-1 border-2 border-[#432818] shadow-[2px_2px_0px_0px_#432818] rotate-12 z-10 rounded-sm">
            AUTO-PILOT
        </div>
        
        <div className="flex gap-4">
             {/* Left Panel: The Problem */}
             <div className="w-1/2 border-r-2 border-dashed border-[#432818]/30 pr-4">
                <h4 className="font-bold text-xs uppercase mb-2 text-[#bc4749]">The Old Way</h4>
                <div className="bg-[#f2e8cf] p-2 text-[10px] font-mono-retro leading-tight text-[#432818] rounded-sm">
                    &gt; Customer emails support<br/>
                    &gt; "I bought 2 left shoes"<br/>
                    &gt; Support replies (2 days later)<br/>
                    &gt; Manual label generation<br/>
                    &gt; Chaos ensues...
                </div>
             </div>
             
             {/* Right Panel: The Solution */}
             <div className="w-1/2 pl-2">
                <h4 className="font-bold text-xs uppercase mb-2 text-[#606c38]">The AfterShip Way</h4>
                <div className="flex flex-col gap-2">
                    <div className="bg-[#D68C5D]/20 border border-[#D68C5D] p-2 text-[10px] text-[#432818] rounded-sm">
                        Self-Service Portal Activated
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#432818]">
                        <CheckCircle size={12} className="text-[#606c38]" />
                        <span>Instant Labels</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#432818]">
                        <CheckCircle size={12} className="text-[#606c38]" />
                        <span>Smart Rules</span>
                    </div>
                </div>
             </div>
        </div>
    </div>

    {/* Joke Content */}
    <div className="bg-[#432818] text-[#FAEDCD] p-4 border-2 border-[#432818] text-center font-mono-retro text-xs rounded-md">
        "Making returns easier than explaining to your grandma what a URL is."
    </div>

    <div className="text-center">
        <Btn href="https://www.aftership.com/returns?as_source=www.aftership.com%2Ftracking&as_source_cta=top-nav-Returns">
            Upgrade Experience
        </Btn>
    </div>
  </div>
);

export const CONTENT_EDD = (
  <div className="p-6 space-y-6 bg-[#FFF8F0]">
    <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif-retro italic text-[#432818]">AI Prediction</h1>
        <div className="animate-pulse bg-[#D68C5D] w-3 h-3 rounded-full border border-[#432818]"></div>
    </div>

    {/* AI Visualization */}
    <div className="bg-[#283618] p-4 border-2 border-[#432818] overflow-hidden relative h-40 flex items-center justify-center rounded-md">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
        
        {/* Animated Graph lines (simulated) */}
        <svg className="w-full h-full absolute bottom-0 left-0" preserveAspectRatio="none">
            <path d="M0,100 C50,80 100,90 150,40 S250,50 300,10" fill="none" stroke="#D68C5D" strokeWidth="3" />
            <path d="M0,100 C60,90 120,95 180,80 S300,70 300,60" fill="none" stroke="#fefae0" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
        
        <div className="z-10 bg-white/10 backdrop-blur-sm border border-white/20 p-2 text-[#FAEDCD] text-xs font-mono-retro rounded-md">
            Accuracy: <span className="text-[#D68C5D] font-bold">90%+</span><br/>
            Carrier Data: <span className="text-gray-400">Lagging</span>
        </div>
    </div>

    <div className="grid grid-cols-2 gap-4 text-sm font-mono-retro">
        <div className="border-2 border-[#432818] p-2 hover:bg-[#D68C5D] transition-colors group cursor-default rounded-md bg-white">
            <strong className="block mb-1 group-hover:text-white text-[#432818]">PDP Widget</strong>
            <p className="text-[10px] text-[#432818]/70 group-hover:text-white">"Get it by Friday"</p>
        </div>
        <div className="border-2 border-[#432818] p-2 hover:bg-[#D68C5D] transition-colors group cursor-default rounded-md bg-white">
            <strong className="block mb-1 group-hover:text-white text-[#432818]">Checkout</strong>
            <p className="text-[10px] text-[#432818]/70 group-hover:text-white">Reduce cart abandonment</p>
        </div>
    </div>

    <Btn href="https://www.aftership.com/edd?as_source=www.aftership.com%2Ftracking&as_source_cta=top-nav-AI+EDD">
        Train the Model
    </Btn>
  </div>
);

export const CONTENT_PRICING = (
  <div className="p-4 bg-[#FFF8F0] h-full flex flex-col">
    <div className="text-center mb-4">
         <h1 className="text-3xl font-serif-retro italic bg-[#D68C5D] text-[#FAEDCD] border-2 border-[#432818] inline-block px-6 py-1 transform -rotate-1 shadow-[4px_4px_0px_0px_#432818] rounded-sm">
            PRICING PLANS
         </h1>
    </div>

    {/* Responsive Grid Layout */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
        
        {/* Free Plan */}
        <div className="border-2 border-[#432818] bg-white p-4 flex flex-col items-center shadow-[4px_4px_0px_0px_#D6C4B0] rounded-md">
            <h3 className="font-mono-retro font-bold uppercase border-b-2 border-[#432818] w-full text-center pb-2 mb-2 text-[#432818]">Starter</h3>
            <div className="text-4xl font-serif-retro mb-2 text-[#432818]">$0</div>
            <p className="text-xs text-[#432818]/60 mb-4 font-mono-retro">For the garage startup.</p>
            <ul className="text-xs space-y-2 w-full font-mono-retro flex-1 text-[#432818]">
                <li>• 50 Shipments</li>
                <li>• Basic Tracking</li>
                <li>• 800+ Carriers</li>
            </ul>
        </div>

        {/* Pro Plan - Highlighted */}
        <div className="border-2 border-[#432818] bg-[#432818] text-[#FAEDCD] p-4 flex flex-col items-center relative transform md:-translate-y-2 shadow-[8px_8px_0px_0px_#D68C5D] rounded-md">
            <div className="absolute -top-3 bg-[#bc4749] text-white text-[10px] font-bold px-2 py-0.5 border border-[#FAEDCD] animate-bounce rounded-sm">BEST VALUE</div>
            <h3 className="font-mono-retro font-bold uppercase border-b-2 border-[#FAEDCD] w-full text-center pb-2 mb-2 text-[#D68C5D]">Pro Essentials</h3>
            <div className="text-4xl font-serif-retro mb-2">$11<span className="text-sm">/mo</span></div>
            <p className="text-xs text-[#FAEDCD]/60 mb-4 font-mono-retro">Serious business.</p>
            <ul className="text-xs space-y-2 w-full font-mono-retro flex-1">
                <li className="text-[#D68C5D]">✓ 1,200 Shipments</li>
                <li>✓ Email & SMS Flows</li>
                <li>✓ Klaviyo Sync</li>
                <li>✓ Analytics</li>
            </ul>
        </div>

        {/* Enterprise */}
        <div className="border-2 border-[#432818] bg-white p-4 flex flex-col items-center shadow-[4px_4px_0px_0px_#D6C4B0] rounded-md">
            <h3 className="font-mono-retro font-bold uppercase border-b-2 border-[#432818] w-full text-center pb-2 mb-2 text-[#432818]">Empire</h3>
            <div className="text-3xl font-serif-retro mb-2 mt-1 text-[#432818]">Custom</div>
            <p className="text-xs text-[#432818]/60 mb-4 font-mono-retro">World domination.</p>
            <ul className="text-xs space-y-2 w-full font-mono-retro flex-1 text-[#432818]">
                <li>• 25k+ Shipments</li>
                <li>• SLA Support</li>
                <li>• Dedicated CSM</li>
            </ul>
        </div>
    </div>

    <div className="mt-auto text-center border-t-2 border-[#432818] pt-4">
        <Btn href="https://www.aftership.com/pricing/tracking?as_source=www.aftership.com%2Fsearch&as_source_cta=top-nav-Pricing">
            See Full Comparison Table
        </Btn>
    </div>
  </div>
);

export const CONTENT_SOLUTIONS = (
    <div className="p-6 bg-[#FFF8F0] space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#432818] flex items-center justify-center text-[#FAEDCD] rounded-md border-2 border-[#D68C5D]">
                <LayoutTemplate size={24} />
            </div>
            <div>
                <h1 className="text-2xl font-serif-retro italic text-[#432818]">Best Practices.ppt</h1>
                <p className="text-xs font-mono-retro text-[#432818]/60">Read-only mode</p>
            </div>
        </div>

        {/* Slide 1: Retail */}
        <div className="border-2 border-[#432818] p-4 bg-white shadow-[6px_6px_0px_0px_#D6C4B0] rounded-md">
            <div className="flex justify-between items-center mb-2 border-b border-[#432818]/30 pb-2">
                <h2 className="font-bold font-mono-retro uppercase flex items-center gap-2 text-[#432818]">
                    <ShoppingBag size={14} /> Retail Brands
                </h2>
                <span className="text-[10px] bg-[#f2e8cf] px-1 rounded-sm text-[#432818]">Slide 1/2</span>
            </div>
            <div className="flex gap-4">
                <div className="w-1/3 bg-[#D68C5D] flex items-center justify-center border-2 border-[#432818] rounded-sm">
                    {/* CSS Art: Bar Chart */}
                    <div className="flex items-end gap-1 h-16 pb-1">
                        <div className="w-2 bg-[#FAEDCD] h-[40%] rounded-t-sm"></div>
                        <div className="w-2 bg-[#FAEDCD] h-[60%] rounded-t-sm"></div>
                        <div className="w-2 bg-[#432818] h-[90%] rounded-t-sm"></div>
                    </div>
                </div>
                <div className="w-2/3 text-xs font-mono-retro text-[#432818]">
                    <p className="mb-2"><strong>The Goal:</strong> Brand Loyalty.</p>
                    <p>Don't send customers to a generic carrier page. Keep them in your ecosystem.</p>
                    <a href="https://www.aftership.com/solutions/retail-brands" target="_blank" className="text-[#D68C5D] underline mt-2 block hover:bg-[#432818] hover:text-[#FAEDCD] inline-block rounded-sm px-1">View Case Studies</a>
                </div>
            </div>
        </div>

        {/* Slide 2: Marketplace */}
        <div className="border-2 border-[#432818] p-4 bg-white shadow-[6px_6px_0px_0px_#D6C4B0] rounded-md">
            <div className="flex justify-between items-center mb-2 border-b border-[#432818]/30 pb-2">
                <h2 className="font-bold font-mono-retro uppercase flex items-center gap-2 text-[#432818]">
                    <Globe size={14} /> Marketplaces
                </h2>
                <span className="text-[10px] bg-[#f2e8cf] px-1 rounded-sm text-[#432818]">Slide 2/2</span>
            </div>
            <div className="flex gap-4 flex-row-reverse">
                <div className="w-1/3 bg-[#432818] flex items-center justify-center border-2 border-[#D68C5D] rounded-sm">
                    <div className="text-[#D68C5D] text-center">
                        <div className="text-xl font-serif-retro">∞</div>
                        <div className="text-[8px] uppercase">Scalability</div>
                    </div>
                </div>
                <div className="w-2/3 text-xs font-mono-retro text-[#432818]">
                    <p className="mb-2"><strong>The Goal:</strong> Agility.</p>
                    <p>Onboard carriers faster than your competition. Standardize tracking data across thousands of sellers.</p>
                    <a href="https://www.aftership.com/solutions/marketplace" target="_blank" className="text-[#D68C5D] underline mt-2 block hover:bg-[#432818] hover:text-[#FAEDCD] inline-block rounded-sm px-1">Marketplace Guide</a>
                </div>
            </div>
        </div>
    </div>
);

export const CONTENT_BLOG = (
    <div className="bg-white h-full flex flex-col font-serif-retro">
        {/* Browser Chrome */}
        <div className="bg-[#f2e8cf] border-b-2 border-[#432818] p-2 flex items-center gap-2 text-xs font-mono-retro">
            <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-[#bc4749] border border-[#432818]"></div>
                <div className="w-3 h-3 rounded-full bg-[#D68C5D] border border-[#432818]"></div>
                <div className="w-3 h-3 rounded-full bg-[#606c38] border border-[#432818]"></div>
            </div>
            <div className="flex-1 bg-white border border-[#432818]/30 px-2 py-1 truncate text-[#432818]/50 rounded-sm">
                http://www.aftership.com/blog/2024-trends
            </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto bg-[#FFF8F0]">
            <div className="text-center mb-8">
                <Newspaper size={48} className="mx-auto mb-2 text-[#432818]" strokeWidth={1} />
                <h1 className="text-4xl italic font-bold text-[#432818]">The Logistics Daily</h1>
                <p className="text-xs font-mono-retro mt-2 uppercase tracking-widest border-t border-b border-[#432818] py-1 inline-block text-[#432818]">Est. 2012</p>
            </div>

            <div className="space-y-6">
                <article className="border-b border-[#432818]/20 pb-4">
                    <h2 className="text-2xl font-bold mb-2 hover:text-[#D68C5D] cursor-pointer text-[#432818]">
                        <a href="https://www.aftership.com/blog" target="_blank">Top eCommerce Trends of 2025</a>
                    </h2>
                    <p className="font-mono-retro text-xs text-[#432818]/60 mb-2">Posted by Admin | 2 Comments</p>
                    <p className="text-sm leading-relaxed text-[#432818]">
                        Sustainability is no longer optional. Discover how carbon-neutral shipping is becoming the industry standard...
                    </p>
                </article>

                <article className="border-b border-[#432818]/20 pb-4">
                    <h2 className="text-2xl font-bold mb-2 hover:text-[#D68C5D] cursor-pointer text-[#432818]">
                         <a href="https://www.aftership.com/blog" target="_blank">Why "Estimated" isn't good enough</a>
                    </h2>
                    <p className="font-mono-retro text-xs text-[#432818]/60 mb-2">Posted by Tech_Lead</p>
                    <div className="bg-[#f2e8cf] p-2 border-l-4 border-[#D68C5D] text-xs font-mono-retro italic my-2 text-[#432818]">
                        "Customers treat delivery dates like promises, not guesses."
                    </div>
                </article>

                <div className="bg-[#D68C5D] text-[#432818] p-4 text-center border-2 border-[#432818] shadow-[4px_4px_0px_0px_#432818] rounded-md">
                    <Zap size={24} className="mx-auto mb-2" />
                    <h3 className="font-bold uppercase font-mono-retro">Subscribe to Newsletter</h3>
                    <input type="email" placeholder="enter_email@aol.com" className="w-full mt-2 p-1 font-mono-retro text-xs border border-[#432818] rounded-sm" />
                    <button className="mt-2 bg-[#432818] text-[#FAEDCD] px-4 py-1 text-xs font-mono-retro uppercase hover:bg-white hover:text-[#432818] border border-[#432818] transition-colors rounded-sm">Submit</button>
                </div>
            </div>
        </div>
    </div>
);

export const CONTENT_README = (
  <div className="font-mono-retro p-6 bg-white min-h-full">
    <div className="border-4 border-double border-[#432818] p-4 mb-6 rounded-md">
        <h1 className="text-4xl font-serif-retro italic mb-2 text-center text-[#432818]">AfterShip OS <span className="text-[#D68C5D]">v3.1</span></h1>
        <p className="text-center text-xs uppercase tracking-[0.2em] text-[#432818]">Cozy Edition</p>
    </div>
    
    <div className="space-y-6 text-sm text-[#432818]">
        <section>
            <h3 className="font-bold bg-[#432818] text-[#FAEDCD] inline-block px-2 mb-2 rounded-sm">WELCOME_MSG:</h3>
            <p>Welcome to the future of logistics, visualized through the lens of a cozy, isometric world. Sit back, relax, and track your packages.</p>
        </section>

        <section className="grid grid-cols-2 gap-4">
            <div className="bg-[#f2e8cf] p-2 border border-[#432818] rounded-md">
                <strong className="block text-[#D68C5D]">Pro Tip #1</strong>
                Double-click icons to unbox apps.
            </div>
            <div className="bg-[#f2e8cf] p-2 border border-[#432818] rounded-md">
                <strong className="block text-[#D68C5D]">Pro Tip #2</strong>
                Maximize windows for a closer look.
            </div>
        </section>

        <div className="text-center mt-8 opacity-50 text-xs">
            <p>© 1999-2025 AfterShip Ltd.</p>
            <p>Build 8904.22-Cozy</p>
        </div>
    </div>
  </div>
);