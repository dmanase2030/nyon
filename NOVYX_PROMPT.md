============================================================
                      NOVYX
            COMPLETE WEBSITE DEVELOPMENT PROMPT
============================================================

PROJECT NAME: NOVYX

PROJECT TYPE:
Full-stack social entertainment and media journaling platform.

DESIGN STYLE:
Clean, minimal, modern, professional, dark-first.

INSPIRATION:
ShareSpot, Letterboxd, and modern social communities.

Build an original product with its own branding,
components, layouts, and visual identity.

============================================================
01. CORE OBJECTIVE
============================================================

Build NOVYX, a complete social platform where users can:

- Create accounts
- Customize profiles
- Upload animated profile pictures
- Upload animated banners
- Upload animated profile backgrounds
- Track movies, anime, and TV shows
- Rate and review entertainment
- Create watchlists and collections
- Follow users and add friends
- Send real-time messages
- Create and join communities
- Publish social posts
- Earn achievements
- Collect and showcase badges
- Customize profile themes and widgets
- Purchase optional Premium memberships

This must be a functional application, not a mockup.

============================================================
02. CRITICAL DESIGN REQUIREMENTS
============================================================

NOVYX MUST LOOK LIKE A PROFESSIONALLY DESIGNED WEBSITE.

The interface should be:

- Minimal
- Clean
- Modern
- Elegant
- Content-focused
- Fast
- Consistent
- Easy to navigate

AVOID:

- Generic AI-generated website templates
- Excessive gradients
- Purple glowing backgrounds
- Giant rounded cards
- Oversized buttons
- Excessive glassmorphism
- Random floating decorations
- Unnecessary animations
- Huge empty spaces
- Cluttered dashboards
- Fake statistics
- Generic marketing sections

USE:

- Subtle borders
- Clean typography
- Consistent spacing
- Compact components
- Restrained colors
- Thoughtful hover states
- Simple navigation
- Professional page layouts

============================================================
03. DESIGN SYSTEM
============================================================

DEFAULT DARK THEME:

Background: #0E0E10
Sidebar: #111113
Surface: #18181B
Hover: #222225
Borders: #27272A
Primary text: #FAFAFA
Secondary text: #A1A1AA
Accent: #FFFFFF

LIGHT THEME:

Background: #FFFFFF
Sidebar: #FAFAFA
Surface: #FFFFFF
Borders: #E4E4E7
Primary text: #18181B
Secondary text: #71717A
Accent: #18181B

TYPOGRAPHY:
Use Inter, Geist, or a similar clean sans-serif font.

COMPONENTS:
- Subtle corner rounding
- Minimal shadows
- Consistent spacing
- Compact buttons
- Clean dropdowns
- Accessible forms
- Simple modals

============================================================
04. TECH STACK
============================================================

FRONTEND:
- Next.js
- React
- TypeScript
- Tailwind CSS

BACKEND:
- Next.js server routes
- Server actions where appropriate

DATABASE:
- Supabase PostgreSQL

AUTHENTICATION:
- Supabase Auth

STORAGE:
- Supabase Storage

REAL-TIME:
- Supabase Realtime

PAYMENTS:
- Stripe

MOVIE AND TV METADATA:
- TMDB API

DEPLOYMENT:
- Vercel or equivalent hosting

============================================================
05. AUTHENTICATION
============================================================

PAGES:
/login
/register
/forgot-password
/reset-password
/verify-email

FEATURES:
- Email registration
- Secure password login
- Email verification
- Password reset
- Persistent sessions
- Secure logout
- Account deletion
- Optional OAuth
- Optional multi-factor authentication

Every account must have a unique username.

PROFILE URL:
/@username

============================================================
06. MAIN NAVIGATION
============================================================

DESKTOP:

Slim left sidebar:
- NOVYX
- Home
- Explore
- Movies
- Anime
- TV Shows
- Collections
- Communities
- Messages
- Notifications
- Profile
- Settings

CENTER:
Main content.

RIGHT SIDEBAR:
Optional trending content and recommendations.

MOBILE:
- Bottom navigation
- Compact headers
- Responsive layouts
- Touch-friendly controls

============================================================
07. USER PROFILES
============================================================

Every user receives a customizable profile.

PROFILE FEATURES:
- Profile picture
- Animated profile picture
- Profile banner
- Animated banner
- Display name
- Username
- Bio
- Status
- Badges
- Verification
- Followers
- Following
- Friends
- Favorite movies
- Favorite anime
- Favorite TV shows
- Collections
- Reviews
- Recent activity
- Profile widgets

PROFILE TABS:
- Overview
- Activity
- Movies
- Anime
- TV
- Reviews
- Collections
- Badges

Default profiles must have a clean, minimal layout.

============================================================
08. FREE ANIMATED PROFILES
============================================================

CRITICAL:

ANIMATED PROFILE PICTURES ARE FREE.
ANIMATED BANNERS ARE FREE.
ANIMATED PROFILE BACKGROUNDS ARE FREE.

NEVER REQUIRE PREMIUM FOR THESE FEATURES.

ALL USERS CAN:
- Upload GIF profile pictures
- Upload animated WEBP profile pictures
- Upload animated banners
- Upload animated backgrounds
- Use animated gradients
- Use moving background effects
- Crop images
- Zoom images
- Reposition images
- Customize background opacity
- Customize background blur
- Change profile colors

Preserve supported animations.

Validate uploads and optimize performance.

Respect reduced-motion accessibility settings.

============================================================
09. PROFILE CUSTOMIZATION
============================================================

PAGE:
/settings/customize

USERS CAN CHANGE:
- PFP
- Banner
- Bio
- Background
- Theme colors
- Text colors
- Card colors
- Borders
- Fonts
- Profile layout
- Widgets
- Favorite media
- Music widgets
- Social links

Provide a live preview.

Save all settings permanently.

============================================================
10. PROFILE DESIGN STUDIO
============================================================

PAGE:
/studio

Build a visual profile editor.

LEFT PANEL:
- Themes
- Backgrounds
- Widgets
- Colors
- Fonts
- Decorations
- Layouts

CENTER:
Interactive profile preview.

RIGHT PANEL:
Selected element properties.

FEATURES:
- Drag-and-drop widgets
- Reorder sections
- Resize supported elements
- Change colors
- Edit backgrounds
- Undo and redo
- Save designs
- Preview mobile layouts
- Preview desktop layouts

Use safe, validated customization data.

============================================================
11. PROFILE WIDGETS
============================================================

INCLUDE:
- About Me
- Favorite Movies
- Favorite Anime
- Favorite TV
- Currently Watching
- Recently Watched
- Watchlist
- Music
- Badge Showcase
- Achievements
- Collections
- Friends
- Social Links
- Image Gallery
- Profile Views
- Custom Text
- Statistics

Users can add, remove, reorder, and customize widgets.

============================================================
12. PROFILE THEME MARKETPLACE
============================================================

PAGES:
/themes
/themes/create
/themes/[id]
/themes/my-themes

FEATURES:
- Browse themes
- Preview themes
- Install themes
- Publish themes
- Favorite themes
- Rate themes
- Report themes
- Search themes

Include free and optional Premium themes.

============================================================
13. MOVIE SYSTEM
============================================================

Use TMDB for real movie metadata.

FEATURES:
- Search movies
- Trending movies
- Popular movies
- Upcoming movies
- Top-rated movies
- Movie posters
- Backdrops
- Descriptions
- Cast
- Genres
- Release dates
- Trailers when available

MOVIE PAGE:
/movies/[id]

USER ACTIONS:
- Add to watchlist
- Mark watched
- Rate
- Review
- Favorite
- Add to collection
- Share

TMDB provides metadata, not full movie streams.

============================================================
14. ANIME SYSTEM
============================================================

Build complete anime tracking.

Use TMDB and, where needed, a dedicated authorized
anime metadata provider.

TRACKING STATUSES:
- Plan to Watch
- Watching
- Completed
- On Hold
- Dropped
- Rewatching

FEATURES:
- Anime search
- Anime details
- Episode tracking
- Ratings
- Reviews
- Favorites
- Watchlists
- Collections
- Statistics

============================================================
15. TV SHOW SYSTEM
============================================================

FEATURES:
- Search TV shows
- View seasons
- View episodes
- Track episodes watched
- Mark seasons completed
- Rate TV shows
- Review TV shows
- Create watchlists
- Add shows to collections

============================================================
16. RATINGS AND REVIEWS
============================================================

RATING SCALE:
1–10

USERS CAN:
- Rate movies
- Rate anime
- Rate TV shows
- Write reviews
- Edit reviews
- Delete reviews
- Mark spoilers
- Like reviews
- Comment on reviews
- Share reviews
- Report reviews

Calculate community ratings from real user data.

Keep community ratings separate from TMDB ratings.

============================================================
17. WATCHLISTS AND COLLECTIONS
============================================================

FEATURES:
- Create watchlists
- Create custom collections
- Name collections
- Add descriptions
- Upload covers
- Add entertainment
- Reorder items
- Share collections
- Public collections
- Private collections

============================================================
18. SOCIAL FEED
============================================================

PAGE:
/home

CONTENT:
- User posts
- Reviews
- Watching activity
- New collections
- Achievements
- Community posts

FEATURES:
- Create posts
- Upload images
- Like
- Comment
- Repost
- Bookmark
- Edit
- Delete
- Report

DESIGN:
Use compact posts separated by subtle borders.

Avoid oversized cards.

============================================================
19. FRIENDS AND FOLLOWERS
============================================================

FEATURES:
- Follow
- Unfollow
- Friend requests
- Accept requests
- Decline requests
- Remove friends
- Block
- Mute
- Mutual friends

============================================================
20. REAL-TIME MESSAGING
============================================================

PAGE:
/messages

FEATURES:
- Direct messages
- Group chats
- Real-time updates
- Typing indicators
- Read receipts
- Image attachments
- Message deletion
- Message requests
- Blocking

Protect private conversations.

============================================================
21. COMMUNITIES
============================================================

PAGE:
/communities

FEATURES:
- Create communities
- Join communities
- Leave communities
- Community icons
- Community banners
- Community rules
- Discussions
- Announcements
- Community moderators
- Member lists
- Reporting tools

============================================================
22. ENTERTAINMENT COMPATIBILITY
============================================================

Allow users to compare:
- Favorite movies
- Favorite anime
- Favorite TV
- Ratings
- Genres
- Shared collections

Display a compatibility percentage calculated
from actual user data.

============================================================
23. SEARCH
============================================================

PAGE:
/search

SEARCH:
- Users
- Movies
- Anime
- TV shows
- Collections
- Communities
- Themes

Include filters and search suggestions.

============================================================
24. NOTIFICATIONS
============================================================

NOTIFICATIONS FOR:
- Followers
- Friend requests
- Likes
- Comments
- Messages
- Badge awards
- Achievements
- Community invitations
- Admin announcements

Include unread counts and notification settings.

============================================================
25. COMPLETE BADGE SYSTEM
============================================================

BADGE CATEGORIES:
- Owner
- Administrator
- Moderator
- Developer
- Support
- Verification
- Premium
- Account age
- Anime
- Movies
- TV
- Social
- Community
- Seasonal
- Secret
- Limited edition
- Custom

Display badges beside usernames and on profiles.

Users can feature and reorder earned badges.

============================================================
26. OFFICIAL BADGES
============================================================

INCLUDE:
- Owner
- Administrator
- Moderator
- Developer
- Support Team
- Design Team
- Beta Tester
- Verified User
- Verified Creator
- Verified Artist
- Verified Organization
- Verified Community

Staff badges must reflect actual assigned roles.

============================================================
27. BADGE RARITIES
============================================================

- Common
- Uncommon
- Rare
- Epic
- Legendary
- Mythic
- Exclusive
- Limited Edition

Support custom colors, borders, and animations.

============================================================
28. ACHIEVEMENT BADGES
============================================================

ANIME:
- Anime Fan
- Otaku
- Anime Warrior
- Anime Master
- Anime Legend
- Episode Hunter
- Anime Critic

MOVIES:
- Movie Fan
- Movie Lover
- Cinephile
- Film Expert
- Cinema Legend
- Movie Critic
- Master Reviewer

ACCOUNT AGE:
- New Member
- 1 Month
- 3 Months
- 6 Months
- 1 Year
- 2 Years
- 5 Years

SOCIAL:
- Social Butterfly
- Community Builder
- Theme Creator
- Community Champion

Award achievements using verified activity data.

============================================================
29. SECRET ACHIEVEMENTS
============================================================

FEATURES:
- Hidden names
- Hidden descriptions
- Mystery icons
- Secret requirements
- Surprise unlock notifications
- Achievement reveal animations

EXAMPLES:
- Night Owl
- Hidden Gem Hunter
- Movie Detective
- Anime Explorer
- Mystery Collector
- Secret Legend

Keep hidden conditions secure on the server.

============================================================
30. SEASONAL BADGES AND EVENTS
============================================================

EVENTS:
- Halloween
- Christmas
- Valentine's Day
- Spring
- Summer
- New Year
- NOVYX Anniversary

FEATURES:
- Event dates
- Challenges
- Limited-edition badges
- Event progress
- Leaderboards
- Countdown timers
- Event announcements

============================================================
31. CUSTOM BADGE SHAPES
============================================================

SHAPES:
- Circle
- Square
- Rounded square
- Hexagon
- Pentagon
- Diamond
- Star
- Heart
- Crown
- Shield
- Lightning bolt
- Custom sanitized SVG

============================================================
32. ANIMATED BADGES
============================================================

EFFECTS:
- Glow
- Pulse
- Shimmer
- Sparkles
- Fire
- Lightning
- Rainbow
- Holographic
- Floating particles

Badge animations should not make the default
website interface visually cluttered.

============================================================
33. ADMIN BADGE ICON EDITOR
============================================================

PAGES:
/admin/badges
/admin/badges/[id]/edit

THE OWNER CAN CHANGE EVERY BADGE ICON.

OPTIONS:
- Upload PNG
- Upload WEBP
- Upload GIF
- Upload sanitized SVG
- Choose emoji
- Choose built-in icons
- Replace icons
- Restore previous icons

EDIT:
- Badge name
- Description
- Icon
- Shape
- Color
- Background
- Border
- Rarity
- Animation
- Glow

Changes must update globally.

Badge icons must be stored dynamically.

============================================================
34. ADMIN BADGE VISUAL DESIGNER
============================================================

PAGE:
/admin/badges/designer

Build a drag-and-drop badge design studio.

LEFT PANEL:
- Icons
- Shapes
- Text
- Images
- Colors
- Gradients
- Borders
- Effects
- Animations
- Templates
- Layers

CENTER:
Interactive design canvas.

RIGHT PANEL:
Element properties.

FEATURES:
- Drag elements
- Resize
- Rotate
- Reposition
- Layer management
- Group layers
- Undo
- Redo
- Save drafts
- Preview
- Publish
- Duplicate
- Export PNG
- Export WEBP
- Export sanitized SVG
- Version history

============================================================
35. BADGE AUTOMATION
============================================================

PAGE:
/admin/badges/automation

ADMINS CAN CREATE RULES:

Example:
Complete 100 anime = Anime Master badge.

Example:
Log 250 movies = Film Expert badge.

Example:
Join during an event = Event badge.

FEATURES:
- Rule creation
- Rule editing
- Eligibility checks
- Automatic awards
- Duplicate prevention
- Award history

============================================================
36. BADGE SHOWCASE
============================================================

PAGE:
/@username/badges

USERS CAN:
- View earned badges
- View locked achievements
- Feature badges
- Reorder badges
- View achievement progress
- Add badge widgets to profiles

============================================================
37. USER LEVELS AND XP
============================================================

FEATURES:
- User levels
- XP progress
- Level milestones
- Level badges
- Achievement notifications

Award XP for legitimate participation.

Prevent XP farming and repetitive abuse.

============================================================
38. PREMIUM MEMBERSHIPS
============================================================

PLANS:

FREE:
$0

PREMIUM:
Suggested $3.99/month

PREMIUM+:
Suggested $6.99/month

LIFETIME PREMIUM:
Suggested $49.99 one-time

Prices must be configurable.

============================================================
39. FREE FEATURES
============================================================

FREE USERS RECEIVE:

- Animated PFPs
- Animated banners
- Animated backgrounds
- Profile customization
- Movies and anime tracking
- Reviews
- Watchlists
- Collections
- Social feed
- Friends
- Messaging
- Communities
- Standard badges
- Achievements
- Basic profile widgets

NEVER LOCK ANIMATED PFPs, BANNERS,
OR BACKGROUNDS BEHIND PREMIUM.

============================================================
40. PREMIUM FEATURES
============================================================

PREMIUM:
- Exclusive Premium badge
- Premium avatar frames
- Exclusive profile decorations
- Gradient usernames
- Premium themes
- Profile music widgets
- Advanced profile analytics
- Additional saved profile designs
- Larger upload limits

PREMIUM+:
- Premium+ badge
- Holographic username effects
- Advanced profile entrance animations
- Exclusive nameplates
- Premium chat bubble designs
- Advanced design tools
- Extra widgets
- Advanced entertainment statistics
- Additional cosmetic effects

LIFETIME PREMIUM:
- Permanent Premium-tier access
- Exclusive Lifetime badge
- Exclusive lifetime cosmetics
- No recurring subscription

============================================================
41. PREMIUM BILLING
============================================================

Use Stripe.

FEATURES:
- Subscribe
- Upgrade
- Downgrade
- Cancel
- Billing portal
- Payment history
- Promotional codes
- Membership gifting

Verify all payment events server-side.

============================================================
42. CUSTOM PREMIUM TIERS
============================================================

The owner can configure additional membership tiers.

EXAMPLES:
- NOVYX Gold
- NOVYX Diamond
- NOVYX Elite

CONFIGURABLE:
- Name
- Description
- Badge
- Icon
- Color
- Price
- Included features
- Exclusive cosmetics

Synchronize paid tiers with Stripe.

============================================================
43. COMPLETE ADMIN DASHBOARD
============================================================

PAGE:
/admin

ADMIN NAVIGATION:
- Overview
- Users
- Moderation
- Reports
- Badges
- Badge Designer
- Achievements
- Events
- Premium
- Communities
- Themes
- Verification
- Announcements
- Support Tickets
- Analytics
- Audit Logs
- Settings

ADMIN DESIGN:
Clean tables, compact cards, minimal charts,
clear controls, and consistent navigation.

============================================================
44. ADMIN ROLES
============================================================

ROLES:
- Owner
- Administrator
- Moderator
- Support
- User

Enforce permissions server-side.

Only the owner can edit protected owner privileges.

============================================================
45. USER MANAGEMENT
============================================================

PAGE:
/admin/users

FEATURES:
- Search users
- View account status
- Issue warnings
- Suspend accounts
- Ban accounts
- Review appeals
- Manage roles
- Manage verification
- View moderation history

Log administrative actions.

============================================================
46. VERIFICATION MANAGEMENT
============================================================

PAGE:
/admin/verification

FEATURES:
- Review applications
- Approve verification
- Reject verification
- Revoke verification
- Customize verification badges
- View verification history

============================================================
47. MODERATION
============================================================

PAGE:
/admin/moderation

FEATURES:
- Review reports
- Moderate posts
- Moderate comments
- Moderate reviews
- Moderate profiles
- Moderate communities
- Moderate themes
- Issue warnings
- Suspend users
- Handle appeals

Protect private user data.

============================================================
48. ADMIN SITE SETTINGS
============================================================

PAGE:
/admin/settings

OWNER CAN CHANGE:
- Website name
- Logo
- Favicon
- Default theme
- Accent colors
- Registration settings
- Upload limits
- Feature flags
- Maintenance mode
- Badge settings
- Premium settings
- Community settings
- Announcements

============================================================
49. ADMIN ANALYTICS
============================================================

PAGE:
/admin/analytics

SHOW:
- Total users
- Active users
- New registrations
- Posts
- Reviews
- Collections
- Communities
- Premium members
- Subscription revenue
- Pending reports

Use real database and billing records.

============================================================
50. ADMIN EVENTS
============================================================

PAGE:
/admin/events

FEATURES:
- Create events
- Edit events
- Set event dates
- Create challenges
- Create seasonal badges
- Configure rewards
- View participants
- Track event progress

============================================================
51. ADMIN THEME MODERATION
============================================================

PAGE:
/admin/themes

FEATURES:
- Review themes
- Approve themes
- Reject themes
- Remove inappropriate themes
- Feature themes
- Manage categories

============================================================
52. SUPPORT TICKETS
============================================================

PAGES:
/support
/admin/support

USERS:
- Submit tickets
- View status
- Reply to tickets

STAFF:
- Review tickets
- Respond
- Escalate
- Close tickets

============================================================
53. PROFILE VIEW COUNTER
============================================================

FEATURES:
- Total profile views
- Weekly view trends
- Monthly view trends
- Optional profile widget

Protect visitor privacy.

============================================================
54. MUSIC FEATURES
============================================================

FEATURES:
- Favorite songs
- Favorite artists
- Music cards
- Profile music widgets
- Authorized audio previews
- External music links

Do not provide unauthorized music playback.

============================================================
55. BOOKS AND GAMES
============================================================

BOOKS:
- Search
- Reading status
- Ratings
- Reviews
- Collections

GAMES:
- Search
- Played status
- Ratings
- Reviews
- Collections

Use authorized metadata sources.

============================================================
56. DATABASE
============================================================

Use Supabase PostgreSQL.

CORE TABLES:
- profiles
- user_settings
- user_roles
- user_follows
- friendships
- blocks
- posts
- post_likes
- post_comments
- reviews
- ratings
- watchlists
- watchlist_items
- collections
- collection_items
- media_progress
- notifications
- conversations
- conversation_members
- messages
- communities
- community_members

CUSTOMIZATION:
- profile_themes
- profile_widgets
- profile_layouts
- profile_designs
- theme_marketplace
- theme_installations

BADGES:
- badges
- user_badges
- badge_requirements
- badge_progress
- badge_designs
- badge_design_layers
- badge_design_versions
- badge_icon_library
- badge_icon_history
- secret_achievements
- achievement_unlocks

EVENTS:
- seasonal_events
- event_challenges
- event_participants
- event_progress

PREMIUM:
- premium_plans
- premium_entitlements
- user_memberships
- membership_grants
- subscription_events
- premium_gifts

ADMIN:
- admin_audit_logs
- moderation_reports
- moderation_actions
- verification_requests
- announcements
- support_tickets
- site_settings
- feature_flags

Use foreign keys, indexes, constraints,
timestamps, and row-level security.

============================================================
57. SECURITY
============================================================

REQUIREMENTS:
- Secure authentication
- Input validation
- Server-side authorization
- Supabase RLS
- Secure uploads
- Content sanitization
- Rate limiting
- Protected private messages
- Protected payment webhooks
- Badge assignment validation
- Staff role protection
- Audit logging

Never expose secret API keys to the browser.

============================================================
58. PERFORMANCE
============================================================

- Optimize images
- Lazy-load posters
- Paginate feeds
- Cache metadata appropriately
- Optimize database queries
- Minimize unnecessary animations
- Use loading skeletons
- Support slower mobile connections

============================================================
59. MOBILE RESPONSIVENESS
============================================================

Support:
- Desktop
- Laptop
- Tablet
- iPhone
- Android

All important features must work on mobile.

============================================================
60. ACCESSIBILITY
============================================================

- Keyboard navigation
- Accessible forms
- Visible focus states
- Screen-reader labels
- Readable contrast
- Reduced-motion support
- Responsive typography

============================================================
61. REQUIRED ROUTES
============================================================

PUBLIC:
/
/login
/register
/explore
/movies
/movies/[id]
/anime
/anime/[id]
/tv
/tv/[id]
/search
/premium

USER:
/home
/@username
/@username/badges
/messages
/notifications
/friends
/watchlist
/collections
/settings
/settings/profile
/settings/customize
/settings/privacy
/settings/security
/studio

COMMUNITIES:
/communities
/communities/[id]

THEMES:
/themes
/themes/create
/themes/[id]

ADMIN:
/admin
/admin/users
/admin/moderation
/admin/reports
/admin/verification
/admin/badges
/admin/badges/designer
/admin/badges/automation
/admin/badges/icons
/admin/achievements
/admin/events
/admin/premium
/admin/communities
/admin/themes
/admin/announcements
/admin/support
/admin/analytics
/admin/audit-logs
/admin/settings

============================================================
62. REAL FUNCTIONALITY
============================================================

DO NOT:
- Create fake buttons
- Fake user activity
- Fake subscriptions
- Fake revenue
- Fake badge ownership
- Fake saved data
- Create nonfunctional pages

EVERY IMPLEMENTED FEATURE MUST:

1. Have a working interface.
2. Have real backend logic.
3. Save data when appropriate.
4. Retrieve saved data.
5. Enforce permissions.
6. Handle errors.
7. Work after refresh.

============================================================
63. DEVELOPMENT PHASES
============================================================

PHASE 1:
Authentication, database, design system.

PHASE 2:
Profiles, customization, animated uploads.

PHASE 3:
Movies, anime, TV, reviews, tracking.

PHASE 4:
Social feed, friends, messaging, communities.

PHASE 5:
Profile Design Studio and themes.

PHASE 6:
Badges, achievements, seasonal events.

PHASE 7:
Admin Badge Designer and automation.

PHASE 8:
Premium memberships and Stripe.

PHASE 9:
Complete administration and moderation.

PHASE 10:
Testing, optimization, deployment.

Implement and verify features incrementally.

============================================================
64. FINAL DESIGN OVERRIDE
============================================================

THIS IS THE MOST IMPORTANT VISUAL REQUIREMENT.

NOVYX MUST LOOK CLEAN AND MINIMAL.

Use:
- Black and white
- Neutral gray surfaces
- Thin borders
- Compact navigation
- Simple icons
- Readable typography
- Balanced spacing
- Minimal transitions

DO NOT USE:
- Excessive purple gradients
- Giant glowing buttons
- Oversized rounded cards
- Random decorative objects
- Unnecessary animations
- Generic AI-generated landing page layouts

Users can still customize their profiles
with colors, animations, backgrounds,
decorations, and badges.

Keep the main website minimal.

============================================================
65. FINAL COMMAND
============================================================

BUILD NOVYX AS A COMPLETE, ORIGINAL,
FULL-STACK SOCIAL ENTERTAINMENT PLATFORM.

KEEP THE DESIGN CLEAN, MINIMAL, AND PROFESSIONAL.

INCLUDE:

✓ Real authentication
✓ Real user profiles
✓ Free animated PFPs
✓ Free animated banners
✓ Free animated backgrounds
✓ Profile customization
✓ Profile Design Studio
✓ Theme Marketplace
✓ Movie tracking
✓ Anime tracking
✓ TV tracking
✓ Ratings and reviews
✓ Watchlists and collections
✓ Social feed
✓ Friends and followers
✓ Real-time messaging
✓ Communities
✓ Notifications
✓ Entertainment compatibility
✓ User levels
✓ Achievements
✓ Secret achievements
✓ Seasonal events
✓ Custom badges
✓ Animated badges
✓ Admin badge icon editing
✓ Admin Badge Visual Designer
✓ Badge automation
✓ Premium memberships
✓ Lifetime Premium
✓ Stripe billing
✓ Complete admin dashboard
✓ User management
✓ Moderation
✓ Verification
✓ Analytics
✓ Secure database
✓ Mobile responsiveness

DO NOT STOP AT A LANDING PAGE.

DO NOT BUILD A STATIC PROTOTYPE.

DO NOT USE FAKE FUNCTIONALITY.

MAKE NOVYX FEEL LIKE A REAL,
ESTABLISHED SOCIAL PLATFORM.

THE FINAL RESULT MUST BE:

CLEAN.
MINIMAL.
FAST.
FUNCTIONAL.
ORIGINAL.
PROFESSIONAL.

============================================================
                 END OF NOVYX PROMPT
============================================================
