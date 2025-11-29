import React from "react";
import { NavLink } from "./NavLink";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "Our Story" },
    { to: "/solutions", label: "Solutions" },
    { to: "/resources", label: "Resources" },
    { to: "/contact", label: "Contact Us" },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <nav className="fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none">
        {/* Floating container */}
        <div
          className={`pointer-events-auto mt-4 mx-auto flex items-center rounded-full border border-border bg-background/80 backdrop-blur-md shadow-lg transition-all duration-300
          ${isScrolled ? "px-4 py-2 max-w-xs justify-center" : "px-6 py-3 max-w-5xl justify-between"}`}
        >
          {/* Logo FIRST */}
          <NavLink to="/" className="flex items-center justify-center">
            <img
              src="https://scribblesense.co.uk/assets/img/logo/logo1.png"
              alt="ScribbleSense Logo"
              className={`transition-all duration-300 ${
                isScrolled ? "h-8 w-auto" : "h-10 w-auto"
              }`}
            />
          </NavLink>

          {/* Desktop links + Join button – small gap after logo, hidden when scrolled */}
          {!isScrolled && (
            <div className="hidden md:flex items-center gap-6 ml-4">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  activeClassName="text-primary font-semibold"
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Join ScribbleSense CTA (desktop) */}
              <DialogTrigger asChild>
                <Button className="ml-2 rounded-full text-sm font-semibold">
                  Join ScribbleSense
                </Button>
              </DialogTrigger>
            </div>
          )}

          {/* Mobile Navigation – hidden when scrolled so only logo is visible */}
          {!isScrolled && (
            <div className="flex md:hidden items-center gap-2 ml-3">
              {/* Join CTA (mobile) */}
              <DialogTrigger asChild>
                <Button size="sm" className="rounded-full text-xs font-semibold">
                  Join
                </Button>
              </DialogTrigger>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col gap-4 mt-8">
                    {links.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                        activeClassName="text-primary font-bold"
                      >
                        {link.label}
                      </NavLink>
                    ))}

                    <DialogTrigger asChild>
                      <Button className="mt-4 rounded-full font-semibold">
                        Join ScribbleSense
                      </Button>
                    </DialogTrigger>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </nav>

      {/* Waitlist Modal */}
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Be the First to Experience Our New App!</DialogTitle>
          <DialogDescription>
            Exciting News! We’re thrilled to announce that our new app is
            launching soon. By joining our waitlist, you'll be among the first
            to experience its features and receive exclusive updates.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Simply enter your details below to secure your spot and stay
            informed.
          </p>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: handle form submit (API call, etc.)
              setIsDialogOpen(false);
            }}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input placeholder="Enter your full name" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Child&apos;s Age</label>
              <Input placeholder="Enter your child's age" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Additional Comments (Optional)
              </label>
              <Textarea placeholder="Any specific needs or comments?" />
            </div>

            <p className="text-xs text-muted-foreground">
              Your information is safe with us. We’ll only use it to notify you
              about the app launch and related updates.
            </p>

            <DialogFooter>
              <Button type="submit" className="w-full">
                Join Waitlist
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
