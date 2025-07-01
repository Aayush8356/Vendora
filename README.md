# 🛍️ Vendora - Premium eCommerce Template

A modern, responsive eCommerce template built with Next.js 15, TypeScript, and Tailwind CSS. Perfect for luxury brands and high-end retail businesses.

![Vendora Preview](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop)

## ✨ Features

- 🎨 **Modern Design** - Clean, contemporary UI with premium aesthetics
- 📱 **Mobile Responsive** - Perfectly optimized for all devices
- ⚡ **Lightning Fast** - Optimized performance with Next.js 15
- 🛒 **Complete eCommerce** - Shopping cart, wishlist, user profiles
- 🔐 **Authentication** - Secure login/register system
- 🎯 **Product Management** - Categories, filtering, search functionality
- 💳 **Payment Ready** - Easy integration with payment processors
- 🎭 **Animations** - Smooth Framer Motion animations
- 🎨 **Customizable** - Easy to customize colors, fonts, and layouts
- 📊 **Admin Dashboard** - Comprehensive admin panel
- 📧 **Newsletter** - Built-in newsletter subscription
- ⭐ **Reviews & Ratings** - Product review system

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vendora-ecommerce.git
   cd vendora-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
vendora-ecommerce/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/             # Admin dashboard
│   │   ├── cart/              # Shopping cart
│   │   ├── categories/        # Product categories
│   │   ├── demo/              # Live demo page
│   │   ├── features/          # Features showcase
│   │   ├── login/             # Authentication
│   │   ├── products/          # Product pages
│   │   ├── profile/           # User profile
│   │   └── wishlist/          # User wishlist
│   ├── components/            # Reusable components
│   │   ├── layout/            # Header, Footer
│   │   ├── product/           # Product components
│   │   ├── sections/          # Page sections
│   │   └── ui/                # UI components
│   ├── context/               # React Context providers
│   │   ├── AuthContext.tsx    # Authentication state
│   │   ├── CartContext.tsx    # Shopping cart state
│   │   ├── NewsletterContext.tsx # Newsletter state
│   │   └── WishlistContext.tsx # Wishlist state
│   └── styles/                # Global styles
├── public/                    # Static assets
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🎨 Customization

### Colors & Branding

1. **Update brand colors** in `tailwind.config.js`
2. **Change logo** in components/layout/Header.tsx
3. **Modify brand name** throughout the application (currently "Vendora")

### Content

1. **Product data** - Update product information in context files
2. **Images** - Replace placeholder images with your products
3. **Copy** - Update text content throughout components

## 🔧 Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **State Management**: React Context API
- **Font**: Inter (Google Fonts)

## 📦 Key Components

### Context Providers
- `AuthContext` - User authentication and session management
- `CartContext` - Shopping cart functionality
- `WishlistContext` - Product wishlist management
- `NewsletterContext` - Email subscription handling

### Main Sections
- `HeroSection` - Homepage hero with product showcase
- `Header` - Navigation with search and user menu
- `Footer` - Site footer with links and newsletter
- `ProductGrid` - Product listing with filtering
- `ProductCard` - Individual product display

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy with default settings

### Other Platforms

The project can be deployed on:
- Netlify
- Railway
- Heroku
- Digital Ocean
- AWS Amplify

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checker
```

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for consistent styling

## 📱 Responsive Design

The template is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔒 Security Features

- Input validation and sanitization
- Secure authentication flow
- Protected routes and components
- Safe HTML rendering
- Environment variable protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💖 Support

If you found this project helpful, please give it a ⭐ on GitHub!

For support, email support@vendora.com or create an issue in the GitHub repository.

## 🎯 Roadmap

- [ ] Add payment integration (Stripe, PayPal)
- [ ] Implement real backend API
- [ ] Add product reviews and ratings
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Mobile app version
- [ ] SEO optimization improvements
- [ ] Performance enhancements

---

**Built with ❤️ by the Vendora Team**

[Demo](https://vendora-demo.vercel.app) • [Documentation](https://docs.vendora.com) • [Support](mailto:support@vendora.com)