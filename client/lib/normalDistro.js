/*
 * functions for computing normal distribution probability.
 * adapted from http://www.math.ucla.edu/~tom/distributions/normal.html
 */
function normalcdf(X){  //HASTINGS.  MAX ERROR = .000001
  console.log(X);
  var T=1/(1+.2316419*Math.abs(X));
  var D=.3989423*Math.exp(-X*X/2);
  console.log('d/t');
  console.log(D);
  console.log(T);  
  var Prob=D*T*(.3193815+T*(-.3565638+T*(1.781478+T*(-1.821256+T*1.330274))));
  if (X>0) {
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
      console.log(num-mean);
      Prob = normalcdf((num-mean)/stdev);
      console.log('P');
      console.log(Prob);
      Prob = round(100000*Prob)/100000;
    }
  }
  return Prob;
}
/*
 * end
 */
