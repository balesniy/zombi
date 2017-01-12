export default function animate(options) {
  var start = performance.now();
  return new Promise ((res, rej)=>{
    try {
      requestAnimationFrame(function animate(time) {
        var dist = (time - start) * options.speed;
        if (dist > options.dist) dist = options.dist;
        if (dist < 0) dist = 0;
        const segment = options.draw(dist);
        if (dist < options.dist && !options.intersect()) {
          requestAnimationFrame(animate);
        } else {
          res(options.intersect() ? segment : false)
        }
      });
    } catch (e){
      rej(e);
    }
  });
}