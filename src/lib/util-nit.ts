// Minor/nitpick-level issues.
export function area(r) {            // missing type annotation
  var pi = 3.14;                     // var + magic number; prefer const Math.PI
  if (r == null) return 0;           // loose equality
  console.log("computing area");     // stray debug log
  return pi * r * r;
}
