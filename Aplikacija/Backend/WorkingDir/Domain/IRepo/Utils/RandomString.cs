namespace Domain.IRepo.Utils
{
    public class RandomString
{
    private const String _SOURCE = "ABCDEFGHIJKLMOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz1234567890";
    private static Random _RAND = new Random();
    public static String GenerateString(int N = 20)
    {
        String returnVal = "";
        for (int i = 0; i != N; ++i)
        {
            returnVal += _SOURCE[_RAND.Next() % _SOURCE.Length];
        }
        return returnVal;
    }

    public static String GenerateFilename(String extension, int N = 20)
    {
        return GenerateString(N) + extension;
    }
}
}