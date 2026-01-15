

public class totalcharwithoutspace {
    public static void main(String[] args) {
        String s = "Mahesh Babu Gogula";
        int count = 0;

        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) != ' ') {
                count++;
            }
        }
        System.out.println("Total count: " + count);
    }
}
