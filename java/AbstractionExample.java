



public abstract class AbstractionExample {

    // contains abstract or non-abstract methods

    public abstract void phoneCall();  // implementation is hidden
   
    public void aboutPhone(){

        long memory;
    };  // non abstract which is not hidden and already revealed the implementation

    public static void main(String[] args) {
        
        Incentive incentive;

        incentive = new Manager(); // we cannot  create an object of abstract class
        incentive.diwaliBonus();

        incentive = new SE();
        incentive.diwaliBonus();
    }
    
}




// interface  Incentive
// {
     
//      abstract void diwaliBonus(); // but this bonus will be different as per their role

// }


// class Manager implements Incentive{
 
//  public void diwaliBonus()
//     {
//         //logic
//     }
// }

// class SE implements Incentive
// {

//    public void diwaliBonus()
//     {
//         // logic
//     }

// }
