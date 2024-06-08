# Routy | Ultimate Task Manager

# DISCLAIMER

I started this project at the day of a given deadline (I do know I will get penalty and I'm okay with that) because of bad time and task management (so ironically) and priority of a university in my life (least possible). Therefore, this project is far from being finished and (especially server-side) should/must be developed further. If you are reading this and you work in any kind of educational organization (e.g. university) with any kind of even smallest power - PLEASE fix educational system. IT is a perfect example of how far and how fast things can develop with a proper tools and desire. Educational system is outdated nonsense that **must** be reformed. Please consider re-thinking all of your actions as "why are we doing this" before you start going "how do we do this". Thank you!

Special thanks to Mr. Jan Dušek for very fair KAJ tests evaluation and flexible study conditions. I wish this was a standard for all the classes.

# Description

Routy (from eng. "to route") is a cross&multi-platform application designed to solve various problems and aspects of the task management routine, being flexible and scalable.

# Motivation

Current motivation (as in the reason of this project exsits) is to finish KAJ class at CTU, the Routy being a semestral work project. Originally, my motivation were problems with time and task management, lots of missed deadlines, lazyness issues, etc. This is a hard and complex aspect of life, but important enough to get relevant attention.

# Goal

The goal (one that I will aim at after I spend more time on this project as [one of my pets](https://github.com/ExposedCat?tab=repositories)) is to implement an ultimate task manager that will be able to solve all the aspects of scheduling:

- Routing: integration with local maps service to automate path finding and optimization
- Planning: selecting optimal time for task completion, depending on task priority, importance, deadline and user mode - relax or productivity
- Statistics: tracking time spent on various classes of tasks, proposals for optimization
- Single input: user can add tasks within a simple interface and it will be enough to view suggested timeline of tasks completion, can be extended with AI processing later on
- Human friendliness: Application will handle inter-tasks such as dressing up, going down the stairs, extra time gaps, etc.
- Notifications: various ways to remind user of upcoming actions;

# Approach & Stack

The task is pretty clear as well as UI. No special algorithms required. For UI, to support all the platforms, the WEB stack was chosen:

- Build tool: **[Vite](https://vitejs.dev/)**
- Programming language: **TypeScript**
- Framework: **React** (lack of time for Svelte)
- UI Toolkit:
  - **[Panda CSS](https://panda-css.com/)**
  - **[Shadow Panda](https://shadow-panda.dev/)** (based on **[shadcn ui](https://ui.shadcn.com/)** and **[radix-ui](https://www.radix-ui.com/)**)
- Routing: **[Tanstack React Router](https://tanstack.com/router/latest)** (everything should be typed, routes are no exception)
- Querying: **[Tanstack Query](https://tanstack.com/query/latest)**
- Icons: **[react-icons](https://react-icons.github.io/react-icons/)** (Material Design pack)
- Runtime validation: **[Zod](https://zod.dev/)** (compile-time validation is not enough especially in this case)

Back-end (server-side) application was written within the smallest possible amount of time to match already passed deadline, so it was written without many best practices and IS vulnerable to various attacks. Please don't try to break it because you will likely succeed - that's expected result. Database itself is running on a different cluster for the sake of security. The stack is:

- Programming language: **TypeScript**
- Network/routing library: **Express**
- Runtime validation: **[Zod](https://zod.dev/)**
- Database driver: **[MongoDB](https://www.mongodb.com/docs/languages/javascript/)**

This repository is a monorepo:

- `packages/routy-shared` - shared package with models and common utils
- `packages/routy-frontend` - UI package
- `packages/routy-server` - back-end package

# Functionality

- User can sign up, log in or use app as a guest
- User can view their dashboard with some insights
- User can create, view, manage and delete Tasks
- User can start, pause and end (client-side) timer (see [pomodoro technique](https://en.wikipedia.org/wiki/Pomodoro_Technique))
- User can view and manage their personal preferences
- User can log out

# TODO

- Integration with local maps service
- Selecting optimal time for task completion, depending on task priority, importance, deadline and user mode - relax or productivity
- Tracking time spent on various classes of tasks, proposals for optimization
- Reminders for upcoming tasks
- Refactoring
- Server-side security
- CI/CD

# Comments

> “Don’t comment bad code — rewrite it.” — Brian W. Kernighan and P. J. Plaugher

Code contains no-to-minimum comments because it was not written to be not understood without comments.

# Evalutation notes

I was trying to complete all the requirements, so some things were implemented in a bit weird or inconsisted way. Still this represents my ability to complete it.

- Documentation: this file
- SVG/Canvas - Timer is built with SVG, icons are SVG
- Media - Timer buttons and timer itself make sounds. Try it out!
- Form validation is done internally by react-form-hook library. Zod schemas are used for it. All the fields have placeholders, default values, etc. where relevant
- Offline application - I didn't have time to setup cache using Service Workers and this was not explicitly mentioned, but I added "online checks" using JS API (as it was mentioned in the task) to ensure app handles loosing Internet connection
- CSS selectors, transformations, animations, etc. - timer was written in pure css (not Panda CSS, see `panda.config.ts`, global css section)
- CSS Media queries - done internally by Panda CSS. From development perspective concept is the same: you specify breakpoints of width and list of styles that apply for it. Also see `hideBelow` prop of Shadow Panda components
- OOP

```typescript
class Task {
  protected state: 'done' | 'partially-done' | 'not-done' = 'not-done';

  constructor(
    private title: string,
    private description: string,
  ) {}

  public get description() {
    return this.description;
  }
}

class IrrelevantTask extends Task {
  constructor(
    private title: string,
    private description: string,
    private excuse: string,
  ) {
    super(title, description);
    this.state = 'done';
  }

  public explain() {
    return `DISCLAIMER: ${this.excuse}\n\n${this.description}`;
  }
}

const OOP = new IrrelevantTask(
  'OOP',
  'Prototypes, usage, etc',
  `
  I could have wrapped utils within a single class, but it doesn't really fit in the codebase.
  I hope type operations (extensions, partials, etc) are enough for this part,
  because it's pretty much the same as you use classes.
`,
);
```

- Advanced JS APIs: I use local storage API for JWT. I plan to use WebSockets for realtime updates listening. Note: I intentionally chose local storage. Nowadays, local storage is not more vulnerable to XSS attacks then cookies. If attacker succeeds in XSS, hiding token won't help you with anything since XSS means they can do whatever user does with your session - no need to know the token. HTTPOnly and other stuff solve consequence instead of solving the problem
- Media JS API: Timer uses JS API, not HTML5 tags (that's the same thing tho)

# Build & Run

- Install dependencies `npm install`
- Build packages `npm run build:all`
- Run server `npm run start:server`
- Either
  - Start dev frontend server `npm run dev:fe`
  - Build frontend `npm run build:fe`
    - Run built frontend `npm run start:fe`
