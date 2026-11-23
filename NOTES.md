# NOTES — The agent builds a game from one prompt (video on X)

## The creative decision

One sentence is the whole video: "I gave my AI agent ONE prompt." The
viewer stays to find out what one prompt can build — so the video answers
in order: the prompt itself, the agent writing real code, the play-test
passing, and the finished game running to a win. No stock footage, no
filler: every frame is the actual build, rendered in this session.

Structure (1080×1920, ~36 s, 60 fps):

1. **Hook (0–3 s):** "I gave my AI agent ONE PROMPT." — big, readable
   in one glance on a phone. The make.fun brand badge sits top-left from
   frame 0, per the press guide.
2. **The prompt (3–6.5 s):** the full prompt in a chat bubble, word for
   word: build a tiny browser game, catch falling stars in a basket,
   arrows or mouse, +1 per star, miss 3 and it's over, win at 20 stars,
   one HTML file, no network.
3. **The agent working (6.5–14 s):** real lines of `game.html`
   (spawnStar, burst, reset, key handlers) and the real play-test
   terminal output — score 20, win, 0 console errors.
4. **The finished game (14–31 s):** real gameplay captured with CDP
   screencast at 15 fps while the game was driven by real pointer input.
   Score climbs 0 → 20, lives hold at 3, the win screen lands.
5. **Close (31–33.5 s):** the win screen holds with "Come build on
   make.fun".
6. **End card (33.5–36 s):** make.fun's official 9:16 referral card
   (transparent WebM from the press pack, used as-is, sha256 verified
   against the manifest), laid over the blurred clip, with referral code
   `2wht1jqa` typed into the field in JetBrains Mono Bold 62 px.

## Why it holds a viewer

The hook asks a question the next 30 seconds answer; the middle proves
the answer is real (code you can read, a test you can see pass, a game
you can watch being won); the score chase gives a reason not to swipe
away mid-clip. Vertical, big text, a new shot every ~3 seconds, no dead
air. Total 36 s — well under X's 140 s limit.

## The game — STAR CATCHER (`game.html`)

One self-contained HTML file, no network, no external assets. Canvas
arcade: basket moves with ←/→ or mouse/touch, stars fall faster as the
score grows, catch = +1 and a particle burst, miss = −1 life (3 lives),
win at 20 stars, R restarts. A `window.GAME` handle exposes state for
the play-test driver only; it does not affect play.

## Verification (all in this session)

- Play-test with real ArrowLeft/ArrowRight key presses (Playwright,
  headless Chromium): **WIN, score 20, lives 2–3, 0 console errors**
  (run twice: before and after the star-speed tweak).
- Capture run (CDP screencast, real pointer steering): **WIN, score 20,
  lives 3, 255 frames, 17.0 s, 0 errors**.
- End card WebM sha256 matches the press manifest
  (`286b76c6…`); badge PNG downloaded from the press pack.
- Final MP4 checked with ffprobe: 1080×1920, H.264 + AAC (silent
  track), 36.0 s. Frames inspected: first (badge + hook, no overlap
  after the content was shifted below the badge box), gameplay mid
  (real game, red hearts readable), card mid-build, last frame (code
  `2wht1jqa` in the field, left of the copy button).
- `main.ts` run the grader way (`MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out
  node main.ts`): copies POST.json byte-for-byte, prints nothing.

## Post text (the user posts the video + this text)

"My AI agent built a tiny browser game from one prompt while I watched —
and it actually works. 🎮

$20 bounty on @makefunai:
https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709
Play code: makefun-bandana-falconer-floss"

Gate check: make.fun link ✓, @makefunai tag ✓, play code ✓.
Play code verified via `/play-code` (n=0 of 4). Referral code verified
via `/api/me/referrals` (`2wht1jqa`).

## Honest weaknesses

- The gameplay footage is upscaled 540×960 → 1080×1920 (screencast
  frames), so it is slightly softer than native 1080p. The game art is
  flat colours and big shapes, so it holds up on a phone, but a pixel
  peeper will notice.
- The "agent working" section shows static code frames, not a live
  typing capture — the code is real and the test output is real, but
  there is no keystroke-by-keystroke motion in that section.
- The video has no voiceover or music (silent AAC track). It relies on
  motion + text; a voiceover would carry it further, but it would also
  need a voice the account does not have.
- Score is engagement-based (views + 10× interactions): the video's
  quality helps only if the post gets seen. Nothing here buys reach.
- The gameplay driver steered with pointer input; the keyboard
  play-test is what proves a human can win it with keys.
