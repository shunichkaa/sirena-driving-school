from collections import deque
from pathlib import Path

from PIL import Image


def flood_exterior_transparent(px, w: int, h: int) -> list[list[bool]]:
    exterior = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()
    for x in range(w):
        for y in (0, h - 1):
            if px[x, y][3] < 40:
                exterior[y][x] = True
                q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if px[x, y][3] < 40 and not exterior[y][x]:
                exterior[y][x] = True
                q.append((x, y))
    while q:
        x, y = q.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if nx < 0 or ny < 0 or nx >= w or ny >= h:
                continue
            if exterior[ny][nx]:
                continue
            if px[nx, ny][3] < 40:
                exterior[ny][nx] = True
                q.append((nx, ny))
    return exterior


def erase_enclosed_components(
    px,
    w: int,
    h: int,
    exterior: list[list[bool]],
    predicate,
    max_component: int,
) -> None:
    seen = [[False] * w for _ in range(h)]
    for y in range(h):
        for x in range(w):
            if seen[y][x]:
                continue
            if not predicate(*px[x, y]):
                continue
            comp: list[tuple[int, int]] = []
            touches_out = False
            dq: deque[tuple[int, int]] = deque()
            dq.append((x, y))
            seen[y][x] = True
            while dq:
                cx, cy = dq.popleft()
                comp.append((cx, cy))
                for nx, ny in ((cx - 1, cy), (cx + 1, cy), (cx, cy - 1), (cx, cy + 1)):
                    if nx < 0 or ny < 0 or nx >= w or ny >= h:
                        continue
                    if exterior[ny][nx]:
                        touches_out = True
                    if predicate(*px[nx, ny]) and not seen[ny][nx]:
                        seen[ny][nx] = True
                        dq.append((nx, ny))
            if not touches_out and len(comp) < max_component:
                for cx, cy in comp:
                    r, g, b, _a = px[cx, cy]
                    px[cx, cy] = (r, g, b, 0)


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    path = root / "public" / "logo-sirena.png"
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    px = im.load()
    exterior = flood_exterior_transparent(px, w, h)

    def is_white(r: int, g: int, b: int, a: int) -> bool:
        return a > 160 and r > 232 and g > 232 and b > 232

    erase_enclosed_components(px, w, h, exterior, is_white, 8000)

    def is_light_gray(r: int, g: int, b: int, a: int) -> bool:
        if a < 150:
            return False
        spread = max(r, g, b) - min(r, g, b)
        return (r + g + b) / 3 > 205 and spread < 45

    exterior = flood_exterior_transparent(px, w, h)
    erase_enclosed_components(px, w, h, exterior, is_light_gray, 8000)

    im.save(path, optimize=True)


if __name__ == "__main__":
    main()
