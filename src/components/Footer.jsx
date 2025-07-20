import React from 'react';
import { Globe, Mail, Github, Linkedin } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Github, href: "#", name: "GitHub" },
    { icon: Linkedin, href: "#", name: "LinkedIn" },
  ];
  
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <footer className="py-12 border-t border-border/50 bg-background/50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold mb-4 gradient-text-purple-teal">Dionis</h3>
            <p className="text-muted-foreground max-w-xs">
              Crafting premium web experiences that drive growth and maximize profit.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              {['home', 'services', 'portfolio', 'contact'].map(link => (
                  <li key={link}>
                      <a href={`#${link}`} onClick={(e) => {e.preventDefault(); scrollToSection(link)}} className="capitalize hover:text-primary transition-colors">{link}</a>
                  </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-4 text-lg">Connect</h4>
            <div className="space-y-3">
              <a
                href="https://dioniscode.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span>dioniscode.com</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => {e.preventDefault(); scrollToSection('contact')}}
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>Request a Quote</span>
              </a>
            </div>
             <div className="flex gap-4 mt-4 justify-center md:justify-start">
                {socialLinks.map(link => (
                    <a key={link.name} href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                        <link.icon className="w-6 h-6" />
                    </a>
                ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Dionis. All rights reserved. Built with passion in Montreal.</p>
        </div>
      </div>
    </footer>
  );
}