package OOPS;

//concrete class
public class BankAccountDetails {

    private String name;
    // private long phoneno;
    private double balance; // is calulated via deposit() and withdraw()
    // private double balance;
    // private double loanAmount;
    // private double emiCalculate;
    // private int tenure;



    public String getName() {
        return name;
    }
    public void setName(String Aadharname) {
        this.name = Aadharname;
    }
    
    

    public  void deposit(double amount)
    {
        if(amount>0)
        {
            balance += amount;
        }
    }
    public void withdraw(double amount){
        if(amount>0 && amount<=balance)
        {
            balance-=amount;
        }
    }
    // public void double emi(double loanAmount, double roi,int tenure ){


    // }
    public double getBalance() {
        return balance;
    }

    public static void main(String[] ar)
    {

        BankAccountDetails obj = new BankAccountDetails();
        obj.setName("Mahesh");

        obj.deposit(5000);
        obj.deposit(1000);
        System.out.println("Hi "+obj.getName()+"After depositing the updated Balance is:" + obj.getBalance());
        obj.withdraw(1000);
        System.out.println("Hi " + obj.getName() +"After Withdrawing the updated Balance is:" + obj.getBalance());

    }
    
}
