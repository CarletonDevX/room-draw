/*
 * functions for computing normal distribution probability.
 * adapted from http://www.math.ucla.edu/~tom/distributions/normal.html
 */
normalcdf = function(x){  //HASTINGS.  MAX ERROR = .000001
  var t=1/(1+.2316419*Math.abs(x));
  var d=.3989423*Math.exp(-x*x/2);
  var Prob=d*t*(.3193815+t*(-.3565638+t*(1.781478+t*(-1.821256+t*1.330274))));
  if (x>0) {
    Prob=1-Prob;
  }
  return Prob;
}
normalProb = function (num, mean, stdev) {
  var Prob;
  with (Math) {
    if(stdev < 0) {
      return NaN;
    }else if(stdev == 0) {
      if(num < mean){
          Prob = 0;
      }else{
        Prob = 1;
      }
    }else{
      Prob = normalcdf((num-mean)/stdev);
      Prob = round(100000*Prob)/100000;
    }
  }
  return Prob;
}
/*
 * end
 */
